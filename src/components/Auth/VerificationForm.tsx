"use client";
import { useRouter } from "next/navigation";
import Button from "../ui/custom/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const VerificationForm = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [code, setCode] = useState("");

  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail(
        localStorage.getItem("v-email-auth") as string
    )
  }, []);

   const handleComplete = async (value: string) => {
    setCode(value);
    if (value.length === 6) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/users/verify_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp: value, email }),
        });
        const data = await response.json();

      if(response.status < 300 && response.status >= 200){
        // save token and user data
        localStorage.setItem("user_data", JSON.stringify(data))
        localStorage.removeItem("v-email-auth")
        if(data.user.role === "rider" ){
          router.replace("/rider/home");
        }else{
        router.replace("/user/home");
        }
      }else{
        toast({title: "Error", description: data.error, variant: "destructive"})
        return
      }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify email",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }
  };

  return(
    <div className="p-6 bg-white rounded-md max-w-md mx-auto shadow-none md:shadow-md">
    <h2 className="text-2xl font-bold mb-1 mx-1">Email Verification</h2>
    <p className="mb-9 text-base mx-1 text-gray-500">
      A 6 digit code was sent to the address {email}
    </p>
    <div className="flex justify-between items-center w-full gap-3 mb-14">
      <InputOTP maxLength={6} value={code}
          onChange={value => setCode(value)}
          onComplete={handleComplete}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <InputOTPGroup key={`group-1-${index}`}>
            <InputOTPSlot index={index} className="p-7 text-2xl" />
          </InputOTPGroup>
        ))}
      </InputOTP>
    </div>
    <Button label="Verify" disabled={code.length !== 6 || isSubmitting}
        onClick={() => handleComplete(code)}/>
  </div>
  )
};

export default VerificationForm;
