import { useState } from "react";
import { useForm } from "react-hook-form";
import { useListingStore } from "~/stores/listing";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

type TFormValues = {
  image: string; // Store the image as a base64 string or null if none selected
};

export default function ImageForm() {
  const router = useRouter();
  const listingStore = useListingStore();
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: { image: listingStore.image },
  });


  const onHandleFormSubmit = (data: TFormValues) => {
    listingStore.onHandleNext()
    createListing.mutate({
      title: listingStore.title,
      price: listingStore.price,
      bedrooms: listingStore.bedrooms,
      bathrooms: listingStore.bathrooms,
      occupants: listingStore.occupants,
      longitude: listingStore.longitude,
      latitude: listingStore.latitude,
      addressString: listingStore.addressString,
      imageSrcs: imageUrls
    });
  }

  const uploadImg = api.image.uploadImages.useMutation({
    onSuccess: (data) => {
      setImageUrls(data)
      router.refresh();
    },
  });

  const createListing = api.listing.createOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const base64Strings = await Promise.all(filesArray.map(file => convertToBase64(file)));
      setBase64Images(base64Strings);
      // Assuming you want to store all images in the listingStore, you can update it accordingly
      listingStore.setImageSrcs(base64Strings);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          if (base64String) {
            resolve(base64String);
          } else {
            reject(new Error("Failed to convert file to base64"));
          }
        } else {
          reject(new Error("Failed to read file as base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          uploadImg.mutate({ images: base64Images });
        }}
        className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white"
      >
        Upload
      </button>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onHandleFormSubmit)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            {...register("image")}
            onChange={handleImageChange} // Handle file change
            className="h-11 rounded-md border px-4 focus:outline-blue-500"
            accept="image/*"
            multiple
            required={true}
          />
        </div>
        <div className="flex justify-end">
          <button
            type={"submit"}
            className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white"
          >
            Next
          </button>
        </div>
        <div className="mt-4">
          <h3 className="mb-2 text-xl font-semibold">
            Listing Store Image Content:
          </h3>
          {listingStore.image && (
            <img
              src={`data:image/jpeg;base64,${listingStore.image}`}
              alt="Selected"
            />
          )}

<div className="mt-4">
  <h3 className="mb-2 text-xl font-semibold">
    AWS Image URLs:
  </h3>
  {imageUrls.map((url, index) => (
    <p key={index} className="mb-2">
      {url}
    </p>
  ))}
</div>
        </div>
      </form>
    </div>
  );
}
