"use client";
import React, { useState } from "react";
import InputField from "../ui/InputField";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const steps = [
  { id: 1, title: "Package Details" },
  { id: 2, title: "Receiver Details" },
  { id: 3, title: "Location Details" },
  { id: 4, title: "Checkout" },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    fromLocation: "",
    toLocation: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto shadow-lg p-8">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 w-full">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    currentStep > step.id
                      ? "bg-green-500"
                      : currentStep === step.id
                      ? "bg-[#F9CA44]"
                      : "bg-gray-200"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={
                        currentStep === step.id ? "text-white" : "text-gray-600"
                      }
                    >
                      {step.id}
                    </span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
              <span className="text-xs mt-2 font-medium text-gray-600">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-10">
        {currentStep === 1 && (
          <div className="space-y-5">
            <InputField
              type="text"
              name="packageName"
              placeholder="Package Name"
              value={formData.packageName}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Package Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all resize-none h-32"
            ></textarea>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-5">
            <InputField
              type="text"
              name="receiverName"
              placeholder="Receiver's Name"
              value={formData.receiverName}
              onChange={handleChange}
              //   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all"
            />
            <InputField
              type="email"
              name="receiverEmail"
              placeholder="Receiver's Email"
              value={formData.receiverEmail}
              onChange={handleChange}
              //   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all"
            />
            <InputField
              type="text"
              name="receiverPhone"
              placeholder="Receiver's Phone Number"
              value={formData.receiverPhone}
              onChange={handleChange}
              //   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all"
            />
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-5">
            {/* From Location */}
            <Select
              onValueChange={(value) =>
                handleChange({ target: { name: "fromLocation", value } })
              }
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-full px-4 py-6 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <SelectValue placeholder="From Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>

            {/* To Location */}
            <Select
              onValueChange={(value) =>
                handleChange({ target: { name: "toLocation", value } })
              }
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-full px-4 py-6 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <SelectValue placeholder="To Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="houston">Houston</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Package Name</p>
                  <p className="font-medium">{formData.packageName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{formData.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receiver Name</p>
                  <p className="font-medium">{formData.receiverName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.receiverEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{formData.receiverPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{formData.fromLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{formData.toLocation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 flex items-center gap-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        {currentStep === steps.length ? (
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
            Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#F9CA44] text-white rounded-lg hover:bg-[#f0c143] transition-colors flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
