"use client"

import React, { useState } from 'react'; 
import { api } from '~/trpc/react';

function ListingForm() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [occupants, setOccupants] = useState('');
    const [schoolDistance, setSchoolDistance] = useState('');
    const [imageURI, setImageURI] = useState(null);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);
        formData.append('occupants', occupants);
        formData.append('schoolDistance', schoolDistance);

        // Append the file to the form data only if a file is selected
        if (imageURI) {
            formData.append('imageURI', imageURI);
        }

        // Here you would send the formData to your server
        // Replace 'your-endpoint' with the endpoint for your server's listing creation API
        try {
            await api.listing.createOne.mutation({
                data: {
                    title: title,
                    price: price,
                    bedrooms: bedrooms,
                    bathrooms: bathrooms,
                    occupants: occupants,
                    schoolDistance: schoolDistance,
                    imageURI: imageURI
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
            />
            <input
                type="number"
                placeholder="Bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
            />
            <input
                type="number"
                placeholder="Occupants"
                value={occupants}
                onChange={(e) => setOccupants(e.target.value)}
            />
            <input
                type="text"
                placeholder="School Distance"
                value={schoolDistance}
                onChange={(e) => setSchoolDistance(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImageURI(e.target.files[0])}
            />
            <button type="submit">Submit Listing</button>
        </form>
    );
}

export default ListingForm;
