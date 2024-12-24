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
  { id: 4, title: "Checkout Order" },
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
    // <div className="min-h-screen md:min-h-0 bg-white md:bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl w-full max-w-2xl flex flex-col justify-between items-center shadow-none md:shadow-lg px-4 py-6 md:p-8">
        {/* Stepper Header */}
        <div className="w-full mb-8">
          <div className="hidden md:flex justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-green-500 scale-105"
                        : currentStep === step.id
                        ? "bg-[#F9CA44] scale-105 ring-4 ring-[#F9CA44]/20"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={currentStep === step.id ? "text-white font-medium" : "text-gray-600"}>
                        {step.id}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <span className="mt-3 text-sm font-medium text-gray-700">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Stepper */}
          <div className="flex md:hidden justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-green-500"
                        : currentStep === step.id
                        ? "bg-[#F9CA44] ring-2 ring-[#F9CA44]/20"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className={currentStep === step.id ? "text-white text-sm" : "text-gray-600 text-sm"}>
                        {step.id}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                        currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <span className="mt-2 text-xs font-medium text-gray-600 max-w-[60px] text-center">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full mb-8 min-h-[300px]">
          <div className={`transition-all duration-300 ${currentStep === 1 ? 'block' : 'hidden'}`}>
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
              />
            </div>
          </div>

          <div className={`transition-all duration-300 ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <div className="space-y-5">
              <InputField
                type="text"
                name="receiverName"
                placeholder="Receiver's Name"
                value={formData.receiverName}
                onChange={handleChange}
              />
              <InputField
                type="email"
                name="receiverEmail"
                placeholder="Receiver's Email"
                value={formData.receiverEmail}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="receiverPhone"
                placeholder="Receiver's Phone Number"
                value={formData.receiverPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`transition-all duration-300 ${currentStep === 3 ? 'block' : 'hidden'}`}>
            <div className="space-y-5">
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "fromLocation", value } } as any)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Location" />
                </SelectTrigger>
                <SelectContent>
                  {/* Location options */}
                  {["Adankolo", "Ganaja", "Crusher", "GRA", "Zone 8", "Lokongoma"].map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "toLocation", value } } as any)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To Location" />
                </SelectTrigger>
                <SelectContent>
                  {/* Location options */}
                  {["Adankolo", "Ganaja", "Crusher", "GRA", "Zone 8", "Lokongoma"].map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={`transition-all duration-300 ${currentStep === 4 ? 'block' : 'hidden'}`}>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium text-gray-900 mt-1">{value || '-'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center w-full pt-4 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2.5 flex items-center gap-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={currentStep === steps.length ? undefined : handleNext}
            className={`px-6 py-2.5 text-white rounded-lg flex items-center gap-2 transition-colors ${
              currentStep === steps.length
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#F9CA44] hover:bg-[#f0c143]"
            }`}
          >
            {currentStep === steps.length ? "Complete Order" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    // </div>
  );
};

export default Stepper;