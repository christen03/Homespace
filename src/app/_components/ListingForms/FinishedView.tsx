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
        <p>Occupants: {listingStore.occupants}</p>
        <p>School Distance: {listingStore.schoolDistance}</p>
        <img src={listingStore.imageSrc} alt={listingStore.title} />
      </div>
    </div>
  )
}