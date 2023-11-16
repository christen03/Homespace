import { useForm } from "react-hook-form";

import { useListingStore } from "~/stores/listing";

type TFormValues = {
    title: string;
};

export default function TitleForm() {

    const listingStore = useListingStore();
    const { register, handleSubmit } = useForm<TFormValues>({
        defaultValues: { title: listingStore.title },
    });

    const onHandleFormSubmit = (data: TFormValues) => {
        listingStore.setTitle(data.title)
        listingStore.onHandleNext();
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onHandleFormSubmit)}
        >
            <div className="flex gap-1 flex-col">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    {...register("title")}
                    className="border h-11 px-4 rounded-md focus:outline-blue-500 "
                    required={true}
                />
            </div>
            <div className="flex justify-end">
                <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
                    Next
                </button>
            </div>
        </form>
    );
}