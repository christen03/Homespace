// WaitlistForm.tsx

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
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

    try {
      onSubmit(formData.email);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (email: string) => {
    try {
      createEmail.mutate({
        email: email,
      });
      createSend.mutate({
        email: email,
      })

      // Email successfully submitted
      console.log("Email submitted successfully:", email);
    } catch (error) {
      console.error("Error:", error);
      throw error; // Propagate the error upwards if necessary
    }
  };

  const createEmail = api.email.createOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const createSend = api.send.sendEmail.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

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
            className="flex-grow rounded-md border-2 border-secondary bg-transparent px-3 py-2 text-black focus:outline-none" // Add the text-black class here
            required
          />

          <button
            type="submit"
            className="font-regular ml-2 rounded-md bg-secondary px-4 py-2 text-black transition duration-300 hover:bg-secondaryDark"
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
