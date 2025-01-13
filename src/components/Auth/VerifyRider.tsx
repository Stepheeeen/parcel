// pages/verification.tsx
"use client";
import React, { useState } from "react";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { Loader } from "../ui/custom/loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface FormDataState {
  nin: string;
  riderIdBase64: string;
  upload: File | null;
}

export default function VerificationForm() {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>({
    nin: "",
    riderIdBase64: "",
    upload: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertFileToBase64(file);
      setFormData((prev) => ({
        ...prev,
        riderIdBase64: base64,
      }));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      nin: formData.nin,
      riderIdBase64: formData.riderIdBase64,
    };

    try {
      const response = await fetch("/api/verification/rider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      console.log(accessToken);
      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        router.replace("/authentication/signup/rider/verify-bike");
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
            <label className="block text-gray-700 text-sm md:text-base mb-2">
              Upload Rider ID (Image or PDF)
            </label>
            <InputField
              placeholder="Upload Rider ID"
              type="file"
              name="riderId"
              onChange={handleFileChange}
            />
          </div>

          {/* Supporting Document Upload */}
          <div>
            <label className="block text-gray-700 text-sm md:text-base mb-2">
              Upload Supporting Document (Optional)
            </label>
            <InputField
              placeholder="Upload Supporting Document"
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
