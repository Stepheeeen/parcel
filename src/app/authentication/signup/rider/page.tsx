import SignUpForm from "@/components/Auth/RiderSignUpForm";
import React, { useState } from "react";

const index = () => {
  return (
    <div className="h-full md:min-h-screen flex items-center justify-center bg-gray-50">
      <SignUpForm />
    </div>
  );
};

export default index;
