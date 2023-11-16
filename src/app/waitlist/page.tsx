"use client";

import { useState } from "react";

export default function Waitlist() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ email: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission logic (in real scenario, this would be an API call or backend processing)
    console.log("Email submitted:", formData.email);
    setSubmitted(true);
    // Reset form data after submission (optional)
    setFormData({ email: "" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="animate-fade-in-down w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {!submitted ? (
          <div className="transition-opacity duration-500 ease-in-out">
            <h2 className="mb-4 text-3xl font-bold text-blue-600">
              Join the Waitlist
            </h2>
            <p className="mb-4 text-gray-600">
              Enter your email to join the waitlist.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="mb-4 w-full rounded-md border border-blue-500 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
              >
                Join
              </button>
            </form>
          </div>
        ) : (
          <div className="transition-opacity duration-500 ease-in-out">
            <h2 className="mb-4 text-3xl font-bold text-blue-600">
              Thank You!
            </h2>
            <p className="mb-4 text-gray-600">
              Your email <strong>{formData.email}</strong> has been submitted
              successfully.
            </p>
            <p className="text-sm text-gray-500">We'll keep you updated.</p>
          </div>
        )}
      </div>
    </div>
  );
}
