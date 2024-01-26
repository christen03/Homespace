import React from 'react';
import { useListingStore } from '~/stores/listing';


export default function FinishedView () {


const listingStore = useListingStore();

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
      <p className="text-lg text-gray-600">Your posting has been successfully submitted.</p>
      <div className="mt-4">
        <p>Title: {listingStore.title}</p>
        <p>Price: {listingStore.price}</p>
        <p>Bedrooms: {listingStore.bedrooms}</p>
        <p>Bathrooms: {listingStore.bathrooms}</p>
        <p>Address: {listingStore.addressString}</p>
        <p>Longitude: {listingStore.longitude}</p>
        <p>Latitude: {listingStore.latitude}</p>
        <p>Shared Space?</p> {listingStore.sharedSpace ? "Yes" : "No"}
        {listingStore.occupants && (
  <div>
    <h3 className="text-lg font-semibold mb-2">Occupants:</h3>
    {listingStore.occupants.map((person, index) => (
      <div key={index} className="mb-2 p-2 border rounded shadow-sm">
        <p><strong>Age:</strong> {person.age}</p>
        <p><strong>Gender:</strong> {person.gender}</p>
        <p><strong>Description:</strong> {person.description}</p>
      </div>
    ))}
      {listingStore.preferredGender && (
        <p>Preferred Gender: {listingStore.preferredGender}</p>
      )}
      {listingStore.minAge && (
        <p>Minimum Age: {listingStore.minAge}</p>
      )}
      {listingStore.maxAge && (
        <p>Maximum Age: {listingStore.maxAge}</p>
      )}
  </div>
)}
{listingStore.roomType && (
  <p>Room Type: {listingStore.roomType}</p>
)}
<p>Benefits you&apos;re providing:</p>
<ul className="list-disc ml-4 mb-4">
  {listingStore.descriptionTags.map((tag, index) => (
    <li key={index} className="mb-1">{tag}</li>
  ))}
</ul>
<p>You&apos;re renting from {listingStore.listingStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} to {listingStore.listingEnd.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {listingStore.imageSrcs.map((src, index) => (
          <img key={index} src={src} alt={`${listingStore.title} ${index + 1}`} />
        ))}
      </div>
    </div>
  )
}