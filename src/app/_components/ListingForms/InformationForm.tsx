import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useListingStore } from "~/stores/listing";
import Counter from "../Counter";
import { type Person, Gender, type RoomType } from "~/types";
import { useState } from "react";

type InfoFormValues = {
  bedrooms: number;
  bathrooms: number;
  price: number;
  sharedSpace: boolean;
  people: Person[];
  roomType: RoomType | undefined;
  preferredGender: Gender | undefined;
  minAge: number | undefined;
  maxAge: number | undefined;
};

export default function InformationForm() {
  const listingStore = useListingStore();
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<InfoFormValues>({
    defaultValues: {
      bedrooms: listingStore.bathrooms,
      bathrooms: listingStore.bathrooms,
      price: listingStore.price,
      sharedSpace: false,
      roomType: undefined,
      people: [],
      preferredGender: undefined,
      minAge: undefined,
      maxAge: undefined,
    },
  });

  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    null,
  );

  const roomTypes: RoomType[] = ['Single', 'Double', 'Triple', 'Quad'];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "people",
  });

  const sharedSpace = watch("sharedSpace");

  const onHandleFormSubmit = (data: InfoFormValues) => {
    if (data.bathrooms <= 0 || data.bedrooms <= 0 || data.price <= 0) {
      setError("root", {
        type: "manual",
        message: "Please ensure all values greater than 0.",
      });
      return;
    }

    if (data.sharedSpace) {
      if (data.roomType == null) {
        setError("root", {
          type: "manual",
          message: "Please select a room type.",
        });
        return;
      }
      if (data.people.length == 0) {
        setError("root", {
          type: "manual",
          message: "Please add at least one person.",
        });
        return;
      }
    }


    clearErrors("root");

    const updatedPeople = data.people.map(person => {
        const ageAsNumber = typeof person.age === "string" ? parseInt(person.age, 10) : person.age;
        return {
          ...person,
          age: !isNaN(ageAsNumber) ? ageAsNumber : 0 
        };
      });
    listingStore.setRoomType(data.roomType);
    listingStore.setBathrooms(data.bathrooms);
    listingStore.setBedrooms(data.bedrooms);
    listingStore.setOccupants(updatedPeople);
    listingStore.setSharedSpace(data.sharedSpace);
    listingStore.setMaxAge(data.maxAge);
    listingStore.setPreferredGender(data.preferredGender);

    let minAgeAsNumber: number | undefined = undefined;
    if (typeof data.minAge === "string") {
      minAgeAsNumber = parseInt(data.minAge, 10);
    } else{
      minAgeAsNumber = data.minAge;
    }
    if (minAgeAsNumber && !isNaN(minAgeAsNumber)) {
      listingStore.setMinAge(minAgeAsNumber);
    }

    let maxAgeAsNumber: number | undefined = undefined;
    if (typeof data.maxAge === "string") {
      maxAgeAsNumber = parseInt(data.maxAge, 10);
    } else{
      maxAgeAsNumber = data.maxAge;
    }
    if (maxAgeAsNumber && !isNaN(maxAgeAsNumber)) {
      listingStore.setMaxAge(maxAgeAsNumber);
    }

    let priceAsNumber: number | undefined = undefined;
    if (typeof data.price === "string") {
      priceAsNumber = parseInt(data.price, 10);
    } else {
      priceAsNumber = data.price;
    }
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
      <div className="flex flex-col gap-1">
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
      <div className="flex flex-col gap-1">
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
                setValue("bathrooms", newValue, { shouldValidate: true });
              }}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
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
                setValue("bedrooms", newValue, { shouldValidate: true });
              }}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
      <label htmlFor="preferredGender">Preferred Gender:</label>
      <Controller
        control={control}
        name="preferredGender"
        render={({ field }) => (
          <select {...field} className="your-select-class">
            <option value="">No preference</option>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.OTHER}>Other</option>
          </select>
        )}
      />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="minAge">Minimum Age:</label>
      <Controller
        control={control}
        name="minAge"
        render={({ field }) => (
          <input
            type="number"
            {...field}
            className="your-input-class"
            placeholder="Enter minimum age"
          />
        )}
      />
    </div>
    <div className="flex flex-col gap-1">
      <label htmlFor="maxAge">Maximum Age:</label>
      <Controller
        control={control}
        name="maxAge"
        render={({ field }) => (
          <input
            type="number"
            {...field}
            className="your-input-class"
            placeholder="Enter maximum age"
          />
        )}
      />
    </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="sharedSpace">Will this be a shared space?</label>
        <Controller
          control={control}
          name="sharedSpace"
          render={({ field }) => (
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              value="sharedSpace"
              className="your-checkbox-class"
            />
          )}
        />
      </div>
     
      {sharedSpace && (
        <div>
           <div className="flex flex-col gap-1">
        <p>What type of room will you be subleasing?</p>
      </div>
             <div style={{ marginBottom: "10px" }}>
      {roomTypes.map((roomType) => (
        <button
          type="button"
          key={roomType}
          onClick={() => {
            setSelectedRoomType(roomType);
            setValue("roomType", roomType); // Set the value in react-hook-form
          }}
          style={{
            backgroundColor:
              selectedRoomType === roomType ? "#007bff" : "#f8f9fa",
            color: selectedRoomType === roomType ? "white" : "black",
            border: "1px solid #dee2e6",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.15s ease-in-out",
            margin: "0 4px",
          }}
        >
          {roomType}
        </button>
      ))}
    </div>
          <p>Add the people your subleaser will be staying with!</p>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-1">
                <label>Person {index + 1}</label>
                <Controller
                  control={control}
                  name={`people.${index}.age`}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="your-input-class"
                      placeholder="Enter age"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`people.${index}.gender`}
                  render={({ field }) => (
                    <select {...field} className="your-select-class">
                      <option value={Gender.MALE}>Male</option>
                      <option value={Gender.FEMALE}>Female</option>
                      <option value={Gender.OTHER}>Other</option>
                    </select>
                  )}
                />
                <Controller
                  control={control}
                  name={`people.${index}.description`}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="your-textarea-class"
                      placeholder="Enter description"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="your-remove-button-class"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({ age: 0, gender: Gender.MALE, description: "" })
              }
              className="your-add-button-class"
            >
              Add Person
            </button>
          </div>
        </div>
      )}
      {errors.root && <p>{errors.root.message}</p>}
      <div className="flex justify-end">
        <button className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white">
          Next
        </button>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={listingStore.onHandleBack}
          className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white"
        >
          Back
        </button>
      </div>
    </form>
  );
}
