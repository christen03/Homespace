import React, { useState } from "react";
import { useListingStore } from "~/stores/listing";
import { TagLabels } from "~/types";
import {Tag as PrismaTag} from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdditionalInformationForm() {
  const [selectedTags, setSelectedTags] = useState<PrismaTag[]>([]);
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);

  const listingStore = useListingStore();

  const toggleTag = (tag: PrismaTag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag],
    );
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
            setStartDate(start);
        setEndDate(end);
    
  };

  const formatDate = (date : Date) => {
    return date ? date.toLocaleDateString() : '';
  };

  const handleNext = () => {
    if (startDate) {
        const start = new Date(startDate.setHours(0, 0, 0, 0));
        listingStore.setListingStart(start);
      }
      if (endDate) {
        const end = new Date(endDate.setHours(23, 59, 59, 999));
        listingStore.setListingEnd(end);
      }
      listingStore.setDescriptionTags(selectedTags);
      listingStore.onHandleNext();
    };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
     {Object.values(PrismaTag).map((tag) => (
      <button
        key={tag}
        onClick={() => toggleTag(tag)}
        style={{
          backgroundColor: selectedTags.includes(tag)
            ? "#007bff"
            : "#f8f9fa",
          color: selectedTags.includes(tag) ? "white" : "black",
          border: "1px solid #dee2e6",
          borderRadius: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.15s ease-in-out",
        }}
      >
        {TagLabels[tag]}
      </button>
    ))}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h2>Select your available dates!</h2>
        {!startDate && <p>Choose your start date</p>}
        {startDate && !endDate && <p>Choose your end date</p>}
        {startDate && endDate && (
          <p>
            Your availability: {formatDate(startDate)} to {formatDate(endDate)}
          </p>
        )}
      </div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
     <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button
          onClick={() => listingStore.onHandleBack()}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.15s ease-in-out",
            marginRight: '10px', // Add some space between the buttons
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!startDate || !endDate}
          style={{
            backgroundColor: (!startDate || !endDate) ? "#ccc" : "#28a745", // Grey out if disabled
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: (!startDate || !endDate) ? "not-allowed" : "pointer", // Change cursor if disabled
            outline: "none",
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.15s ease-in-out",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
