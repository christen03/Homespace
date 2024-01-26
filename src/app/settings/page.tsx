"use client";
import { api } from "~/trpc/react";
import ListingCard from "../_components/listing-card";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";

export default function Page() {
  const getUserData = api.users.getCurrentUser.useQuery();
  const userData = getUserData.data; // listings
  const [isEditMode, setIsEditMode] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const linkedinRef = useRef<HTMLInputElement | null>(null);
  const instagramRef = useRef<HTMLInputElement | null>(null);
  const twitterRef = useRef<HTMLInputElement | null>(null);
  const facebookRef = useRef<HTMLInputElement | null>(null);

  const updateUserData = api.users.updateCurrentUser.useMutation({
    onSuccess: async () => {
      setIsEditMode(false);
      await getUserData.refetch(); // Refetch the user data after successful update
    },
  });

  const handleSaveNewData = () => {
    const newName = nameRef.current?.value;
    const newUsername = usernameRef.current?.value;
    const newPhone = phoneRef.current?.value;
    const newBio = bioRef.current?.value;
    const newSocials = [
      linkedinRef.current?.value,
      instagramRef.current?.value,
      twitterRef.current?.value,
      facebookRef.current?.value,
    ].filter((social) => social !== undefined) as string[]; // Filter out undefined and assert as string[]

    updateUserData.mutate({
      name: newName,
      username: newUsername,
      phoneNumber: newPhone,
      biography: newBio,
      socials: newSocials,
    });

    console.log("data updated!");
  };

  const renderLabeledInput = (
    label: string,
    ref: React.RefObject<HTMLInputElement>,
    defaultValue: string | undefined,
    disabled: boolean,
  ) => (
    <div className="flex items-center space-x-2">
      <label className="font-regular min-w-[100px] text-right">{label}:</label>
      <input
        className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
          disabled ? "bg-gray-100" : ""
        }`}
        ref={ref}
        type="text"
        defaultValue={defaultValue ?? ""} // Fallback to empty string if defaultValue is undefined
        disabled={disabled}
      />
    </div>
  );

  const renderLabeledTextarea = (
    label: string,
    ref: React.RefObject<HTMLTextAreaElement>,
    defaultValue: string | undefined,
    disabled: boolean,
  ) => (
    <div className="flex flex-col space-y-2">
      <label className="font-regular text-left">{label}:</label>
      <textarea
        className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
          disabled ? "bg-gray-100" : ""
        }`}
        ref={ref}
        defaultValue={defaultValue ?? ""} // Fallback to empty string if defaultValue is undefined
        disabled={disabled}
        rows={3}
      />
    </div>
  );

  if (userData === undefined || userData === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col px-36 py-2">
      <div className="mt-16 flex w-full flex-col items-center">
        {" "}
        <div className="mt-8">
          <div className="text-left">
            <div className="text-5xl font-bold">Account Settings</div>
          </div>
        </div>
        <div className="mt-16 h-[full]">
          <img
            src={userData.image!}
            alt="Profile Image"
            className="h-[10rem] rounded-full border-4 border-secondary"
          ></img>
        </div>
        <div className="mt-8">
          <div className="text-left">
            <div className="text-4xl font-bold">Welcome, {userData.name!}!</div>
            <div className="text-4xl font-bold">
              Your username is @{userData.username}
            </div>
          </div>
        </div>
        <div className="mt-8"></div>
        <div className="mt-4 flex flex-col items-center justify-center px-12">
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
        </div>
      </div>
      <div className="text-center">
        {isEditMode ? (
          <div className="mt-4 space-y-4">
            {renderLabeledInput("Name", nameRef, userData.name ?? "", false)}
            {renderLabeledInput(
              "Username",
              usernameRef,
              userData.username ?? "",
              false,
            )}
            {renderLabeledInput(
              "Phone",
              phoneRef,
              userData.phoneNumber ?? "",
              false,
            )}
            {renderLabeledInput(
              "LinkedIn",
              linkedinRef,
              userData.socials[0] ?? "",
              false,
            )}
            {renderLabeledInput(
              "Instagram",
              instagramRef,
              userData.socials[1] ?? "",
              false,
            )}
            {renderLabeledInput(
              "Twitter",
              twitterRef,
              userData.socials[2] ?? "",
              false,
            )}
            {renderLabeledInput(
              "Facebook",
              facebookRef,
              userData.socials[3] ?? "",
              false,
            )}
            {renderLabeledTextarea(
              "Biography",
              bioRef,
              userData.biography ?? "",
              false,
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {renderLabeledInput("Name", nameRef, userData.name ?? "", true)}
            {renderLabeledInput(
              "Username",
              usernameRef,
              userData.username ?? "",
              true,
            )}
            {renderLabeledInput(
              "Phone",
              phoneRef,
              userData.phoneNumber ?? "",
              true,
            )}
            {renderLabeledInput(
              "LinkedIn",
              linkedinRef,
              userData.socials[0] ?? "",
              true,
            )}
            {renderLabeledInput(
              "Instagram",
              instagramRef,
              userData.socials[1] ?? "",
              true,
            )}
            {renderLabeledInput(
              "Twitter",
              twitterRef,
              userData.socials[2] ?? "",
              true,
            )}
            {renderLabeledInput(
              "Facebook",
              facebookRef,
              userData.socials[3] ?? "",
              true,
            )}
            {renderLabeledTextarea(
              "Biography",
              bioRef,
              userData.biography ?? "",
              true,
            )}
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
              sharedSpace={listing.sharedSpace}
              imgSrcs={listing.imageSrcs}
              addressString={listing.addressString}
              listingStart={listing.listingStart.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              listingEnd={listing.listingEnd.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              descriptionTags={listing.descriptionTags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
