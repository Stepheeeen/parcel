"use client"
import React, { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Stepper Header */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.id ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.id}
            </div>
            <span className="text-sm mt-2">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 1: Package Details</h2>
            <input
              type="text"
              name="packageName"
              placeholder="Package Name"
              value={formData.packageName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mb-4"
            />
            <textarea
              name="description"
              placeholder="Package Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            ></textarea>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 2: Receiver Details</h2>
            <input
              type="text"
              name="receiverName"
              placeholder="Receiver's Name"
              value={formData.receiverName}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mb-4"
            />
            <input
              type="email"
              name="receiverEmail"
              placeholder="Receiver's Email"
              value={formData.receiverEmail}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mb-4"
            />
            <input
              type="text"
              name="receiverPhone"
              placeholder="Receiver's Phone Number"
              value={formData.receiverPhone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 3: Location Details</h2>
            <input
              type="text"
              name="fromLocation"
              placeholder="From Location"
              value={formData.fromLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mb-4"
            />
            <input
              type="text"
              name="toLocation"
              placeholder="To Location"
              value={formData.toLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 4: Checkout</h2>
            <p>
              <strong>Package Name:</strong> {formData.packageName}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
            <p>
              <strong>Receiver Name:</strong> {formData.receiverName}
            </p>
            <p>
              <strong>Email:</strong> {formData.receiverEmail}
            </p>
            <p>
              <strong>Phone:</strong> {formData.receiverPhone}
            </p>
            <p>
              <strong>From:</strong> {formData.fromLocation}
            </p>
            <p>
              <strong>To:</strong> {formData.toLocation}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        {currentStep === steps.length ? (
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Submit</button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;