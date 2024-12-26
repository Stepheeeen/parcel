"use client";
import Stepper from "@/components/User/OrderStepper";
import React from "react";

const index = () => {
  return (
    <div className="h-full md:min-h-screen bg-gray-100 flex items-center md:justify-center">
      <Stepper />
    </div>
  );
};

export default index;
