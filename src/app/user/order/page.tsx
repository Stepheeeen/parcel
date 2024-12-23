"use client"
import { Button } from "@/components/ui/button";
import Stepper from "@/components/User/OrderStepper";
import { toast } from "@/hooks/use-toast";
import React from "react";

const index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Stepper />

      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
            variant: "destructive"
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
};

export default index;
