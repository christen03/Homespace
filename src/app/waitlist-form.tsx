// WaitlistForm.tsx

import React, { useState } from "react";

interface WaitlistFormProps {
  onSubmit: (email: string) => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ email: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate submission logic (in real scenario, this would be an API call or backend processing)
    console.log("Email submitted:", formData.email);
    setSubmitted(true);
    // Reset form data after submission (optional)
    setFormData({ email: "" });

    // Call the onSubmit prop with the form data
    onSubmit(formData.email);
  };

  return (
    <div className="transition-opacity duration-500 ease-in-out">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="flex-grow rounded-md border-2 border-secondary bg-transparent px-3 py-2 text-white focus:outline-none" // Add the text-white class here
            required
          />

          <button
            type="submit"
            className="font-regular ml-2 rounded-md bg-secondary px-4 py-2 text-white transition duration-300 hover:bg-secondaryDark"
          >
            Join
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-xl text-gray-200">
            Your email <strong>{formData.email}</strong> has been submitted
            successfully.
          </p>
          <p className="text-xl text-gray-200">We&apos;ll keep you updated.</p>
        </div>
      )}
    </div>
  );

};

export default WaitlistForm;
