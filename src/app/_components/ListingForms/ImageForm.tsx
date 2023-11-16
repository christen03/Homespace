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
  const [image, setImage] = useState("");

  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: { image: listingStore.image },
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setImage(data.image);
    listingStore.setImage(data.image);
    listingStore.onHandleNext();
  };

  const uploadImg = api.image.uploadImage.useMutation({
    onSuccess: () => {
      router.refresh();
      setImage("");
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64String = await convertToBase64(file);
      setImage(base64String);
      listingStore.setImage(base64String);
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
          uploadImg.mutate({ image });
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

          <h3 className="mb-2 text-xl font-semibold">
            AWS Image url: {listingStore.imageSrc}
          </h3>
        </div>
      </form>
    </div>
  );
}
