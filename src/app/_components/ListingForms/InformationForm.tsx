import { Controller, useForm } from "react-hook-form";
import { useListingStore } from "~/stores/listing";
import Counter from "../Counter";

type InfoFormValues = {
    bedrooms: number;
    bathrooms: number;
    occupants: number;
    price: number;
};

export default function InformationForm() {

    const listingStore = useListingStore();
    const { handleSubmit, control, setValue, setError, clearErrors, formState: { errors } } = useForm<InfoFormValues>({
        defaultValues: {
            bedrooms: listingStore.bathrooms,
            bathrooms: listingStore.bathrooms,
            occupants: listingStore.occupants,
            price: listingStore.price,
        },
    });

    const onHandleFormSubmit = (data: InfoFormValues) => {
        if (data.bathrooms <= 0 || data.bedrooms <= 0 || data.price <= 0) {
            setError("root", {
                type: "manual",
                message: "Please ensure all values greater than 0.",
            });
            return;
        }
        clearErrors("root");

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
        if (priceAsNumber && !isNaN(priceAsNumber)) {
            listingStore.setPrice(priceAsNumber);
            listingStore.onHandleNext();
        }
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
                            subtitle="Set the number of bedrooms"
                            value={field.value}
                            onChange={(newValue) => {
                                setValue('bedrooms', newValue, { shouldValidate: true });
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex gap-1 flex-col">
                <label htmlFor="occupants"># of occupants:</label>
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
            {errors.root && <p>{errors.root.message}</p>}
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