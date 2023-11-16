"use client"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useListingStore } from "~/stores/listing"
import TitleForm from "../_components/ListingForms/TitleForm"
import InformationForm from "../_components/ListingForms/InformationForm"
import AddressForm from "../_components/ListingForms/AddressForm"
import ImageForm from "../_components/ListingForms/ImageForm";

type Inputs = {
    example: string
    exampleRequired: string
}

function ActiveFormComponent() {
    const store = useListingStore();
    switch (store.step) {
        case 1:
            return <TitleForm />

        case 2:
            return <InformationForm />

        case 3:
            return <AddressForm />
        
        case 4:
            return <ImageForm />
    }
}

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="p-6 w-full max-w-2xl  border  rounded-xl bg-white">
                <h1 className="text-center text-2xl font-semibold py-4">
                    Lynk your apartment!
                </h1>
                <div className="space-y-6">
                    <ActiveFormComponent />
                </div>
            </div>
        </main>
    );
}