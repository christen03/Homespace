"use client"

import { useRouter } from "next/navigation"
import { useState, useMemo } from "react";
import Modal from "./Modal";
import useListingModal from "~/hooks/useListingModal";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import Counter from "../Counter";
import TextInput from "../TextInput";




enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const ListingModal = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            price: 1,
            bedrooms: 1,
            bathrooms: 1,
            occupants: 1,
            schoolDistance: '',
            imageSrc: '',
        }
    });

    const imageSrc = watch('imageSrc');
    const bathrooms = watch('bathrooms');
    const bedrooms = watch('bedrooms');
    const occupants = watch('occupants');


    const router = useRouter();
    const listingModal = useListingModal();
    const [isLoading, setIsLoading] = useState(false);

    const [step, setStep] = useState(STEPS.CATEGORY);

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        router.refresh();
        console.log("hihihi");
        setIsLoading(false);
        //API CALL TO SUBMIT DATA HERE!!!
    }


    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <h1>Which of these best describes your place?</h1>
            <div
                className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <h1>Where are you located?</h1>
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <h1>More information!</h1>
                <Counter
                    onChange={(value) => setCustomValue('occupants', value)}
                    value={occupants}
                    title="Guests"
                    subtitle="How many occupants do you allow?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('bedrooms', value)}
                    value={bedrooms}
                    title="Rooms"
                    subtitle="How many bedrooms do you have?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('bathrooms', value)}
                    value={bathrooms}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <h1>
                    Add a photo of your place
                    </h1>
                {/* <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                /> */}
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <h1>Describe your place!</h1>
                <TextInput
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <h1>
                    Price
                    </h1>
                <TextInput
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={listingModal.isOpen}
            title="List your home!"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            onClose={listingModal.onClose}
            body={bodyContent}
        />
    );
}

export default ListingModal;
