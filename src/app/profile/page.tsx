"use client";
import { api } from "~/trpc/react";
import ListingCard from "../_components/listing-card";
import { useState } from "react";
import { useRef } from "react";

export default function Page() {
  const getUserData = api.users.getCurrentUser.useQuery();
  const userData = getUserData.data;
  const [isEditMode, setIsEditMode] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);

  const updateUserData = api.users.updateCurrentUser.useMutation({
    onSuccess: async () => {
      setIsEditMode(false);
      await getUserData.refetch(); // Refetch the user data after successful update
    },
  });

  const handleSaveNewData = () => {
    const newName = nameRef.current?.value;
    const newPhone = phoneRef.current?.value;
    const newBio = bioRef.current?.value;
    const newLocation = locationRef.current?.value;

    // Check if any field is empty
    if (!newName || !newPhone || !newBio || !newLocation) {
      alert("All fields must be filled out");
      return;
    }

    updateUserData.mutate({
      name: newName,
      phoneNumber: newPhone,
      biography: newBio,
      location: newLocation,
    });
    console.log("data updated!");
  };

  if (userData === undefined || userData === null) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome, {userData.name}</h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            setIsEditMode(!isEditMode);
            if (isEditMode) {
              handleSaveNewData();
            }
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
        {isEditMode ? (
          <div className="mt-4">
            <label>Name:</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              ref={nameRef}
              type="text"
              defaultValue={userData.name}
            />
            <label>Phone:</label>
            <input
              className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              ref={phoneRef}
              type="text"
              defaultValue={userData.phoneNumber}
            />
            <label>Biography:</label>
            <input
              className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              ref={bioRef}
              type="text"
              defaultValue={userData.biography}
            />
            <label>Location:</label>
            <input
              className="focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              ref={locationRef}
              type="text"
              defaultValue={userData.location}
            />
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-xl">{userData.name}</p>
            <p className="text-xl">{userData.phoneNumber}</p>
            <p className="text-xl">{userData.biography}</p>
            <p className="text-xl">{userData.location}</p>
          </div>
        )}
      </div>
      <div className="ml-20 mr-20 mt-4 flex flex-col">
        <div className="align-center mt-2 w-full justify-center"></div>
        <div className="mb-20 mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {userData.listings.map((listing) => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              price={listing.price}
              bathrooms={listing.bathrooms}
              bedrooms={listing.bedrooms}
              occupants={listing.occupants}
              imgSrc={listing.imageSrc}
              createdBy={listing.createdById}
            ></ListingCard>
          ))}
        </div>
      </div>
    </main>
  );
}
