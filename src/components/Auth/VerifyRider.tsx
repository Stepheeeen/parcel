"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { Loader } from "../ui/custom/loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface FormDataState {
  nin: string;
  id: string; // Changed from riderId to match API
  upload: File | null;
}

export default function VerificationForm() {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>({
    nin: "",
    id: "", // Changed from riderId to match API
    upload: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      // Create FormData object to match API requirements
      const formDataPayload = new FormData();
      formDataPayload.append("nin", formData.nin);
      formDataPayload.append("id", formData.id);
      if (formData.upload) {
        formDataPayload.append("upload", formData.upload);
      }

      const response = await fetch("/api/verification/rider", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Remove Content-Type header to let browser set it with boundary parameter
        },
        body: formDataPayload,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        router.replace("/authentication/signup/rider/verify-bike");
        localStorage.removeItem("access_token");
      } else {
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex pt-[20%] md:pt-8 md:items-center justify-center p-2 md:p-8">
      {loading && <Loader />}
      <div className="bg-white p-6 md:p-12 rounded-lg w-full max-w-md md:max-w-2xl lg:max-w-3xl md:shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
          Rider Verification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* NIN */}
          <div>
            <InputField
              type="text"
              placeholder="Enter your NIN"
              name="nin"
              value={formData.nin}
              onChange={handleInputChange}
            />
          </div>

          {/* Rider ID */}
          <div>
            <InputField
              type="text"
              placeholder="Enter your Rider ID"
              name="id" // Changed from riderId to match API
              value={formData.id} // Changed from riderId to match API
              onChange={handleInputChange}
            />
          </div>

          {/* Supporting Document Upload */}
          <div>
            <label className="block text-gray-700 text-sm md:text-base mb-2">
              Upload Supporting Document (Optional)
            </label>
            <InputField
              placeholder="Upload Your Passport"
              type="file"
              name="upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFormData((prev) => ({
                    ...prev,
                    upload: e.target.files[0],
                  }));
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mb-8">
            <Button label="Proceed" />
          </div>
        </form>
      </div>
    </div>
  );
}