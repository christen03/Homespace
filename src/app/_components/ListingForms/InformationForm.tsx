import { Controller, useForm } from "react-hook-form";

import { useListingStore } from "~/stores/listing";
import Counter from "../Counter";
import { string } from "zod";

type InfoFormValues = {
    bedrooms: number;
    bathrooms: number;
    occupants: number;
    price: number;
};

export default function InformationForm() {

    const listingStore = useListingStore();
    const { handleSubmit, control, setValue } = useForm<InfoFormValues>({
        defaultValues: {
            bedrooms: listingStore.bathrooms,
            bathrooms: listingStore.bathrooms,
            occupants: listingStore.occupants,
            price: listingStore.price,
        },
    });

    const onHandleFormSubmit = (data: InfoFormValues) => {
      listingStore.setBathrooms(data.bathrooms);
      listingStore.setBedrooms(data.bedrooms);
      listingStore.setOccupants(data.occupants);

      let priceAsNumber: number | undefined = undefined;

      // Check if data.price is a string and convert it to a number
      if (typeof data.price === "string") {
        priceAsNumber = parseInt(data.price, 10);
      } else {
        // If it's not a string, it might already be a number
        priceAsNumber = data.price;
      }

      // Check if price is a valid number
     
        listingStore.setPrice(priceAsNumber!);
        listingStore.onHandleNext();
      
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onHandleFormSubmit)}
        >
            <div className="flex gap-1 flex-col">
    <label htmlFor="price">Price:</label>
    <Controller
        control={control}
        name="price"
        render={({ field }) => (
            <input
                type="number"
                {...field}
                className="your-input-class"
                placeholder="Enter the price"
            />
        )}
    />
</div>
            <div className="flex gap-1 flex-col">
                <label htmlFor="bathrooms"># of bathrooms:</label>
                <Controller
                    control={control}
                    name="bathrooms"
                    render={({ field }) => (
                        <Counter
                            title="Bathrooms"
                            subtitle="Set the number of bathrooms"
                            value={field.value}
                            onChange={(newValue) => {
                                setValue('bathrooms', newValue, { shouldValidate: true });
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex gap-1 flex-col">
                <label htmlFor="bedrooms"># of bedrooms:</label>
                <Controller
                    control={control}
                    name="bedrooms"
                    render={({ field }) => (
                        <Counter
                            title="Bedrooms"
                            subtitle="Set the number of bathrooms"
                            value={field.value}
                            onChange={(newValue) => {
                                setValue('bedrooms', newValue, { shouldValidate: true });
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex gap-1 flex-col">
                <label htmlFor="bedrooms"># of occupants:</label>
                <Controller
                    control={control}
                    name="occupants"
                    render={({ field }) => (
                        <Counter
                            title="Occupants"
                            subtitle="Set the number of occupants"
                            value={field.value}
                            onChange={(newValue) => {
                                setValue('occupants', newValue, { shouldValidate: true });
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex justify-end">
                <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
                    Next
                </button>
            </div>
            <div className="flex gap-4 justify-end">
                <button
                    type="button"
                    onClick={listingStore.onHandleBack}
                    className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
                >
                    Back
                </button>
            </div>
        </form>
    );
}