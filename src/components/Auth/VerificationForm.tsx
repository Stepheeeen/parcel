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
import { Loader } from "../ui/custom/loader";

const VerificationForm = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [code, setCode] = useState("");

  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("v-email-auth") as string);
  }, []);

  const handleComplete = async (value: string) => {
    setCode(value);
    if (value.length === 6) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/users/verify_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp: value, email }),
        });

        const data = await response.json();
        // console.log(data);

        if (response.status < 300 && response.status >= 200) {
          // save token and user data
          localStorage.setItem("user_data", JSON.stringify(data));
          localStorage.setItem("access_token", data.accessToken);
          localStorage.removeItem("v-email-auth");
          if (data.user.role === "rider") {
            router.replace("/authentication/signup/rider/verify");
          } else {
            router.replace("/user/home");
          }
        } else {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
          return;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify email",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/users/resend_verification_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      // console.log(response.data);

      if (response.status < 300 && response.status >= 200) {
        toast({
          title: "Success",
          description: "OTP sent successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify email",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md w-full pl-5 max-w-md mx-auto shadow-none md:shadow-md">
      {isSubmitting && <Loader />}
      <h2 className="text-2xl font-bold mb-1 mx-1">Email Verification</h2>
      <p className="mb-9 text-base mx-1 text-gray-500">
        A 6 digit code was sent to the address {email}
      </p>
      <div className="flex flex-col items-center justify-center w-full gap-4 sm:gap-5 md:gap-6 mb-14 px-4">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value) => setCode(value)}
          onComplete={handleComplete}
          className="flex flex-wrap justify-center gap-3"
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPGroup key={`group-1-${index}`}>
              <InputOTPSlot
                index={index}
                className="p-4 sm:p-5 text-xl sm:text-2xl border border-black w-12 h-12 sm:w-14 sm:h-14 text-center"
              />
            </InputOTPGroup>
          ))}
        </InputOTP>

        <div className="w-full flex justify-end">
          <p
            className="text-sm sm:text-md text-yellow-400 hover:underline cursor-pointer"
            onClick={handleResendOtp}
          >
            Resend Code
          </p>
        </div>
      </div>

      <Button
        label="Verify"
        disabled={code.length !== 6 || isSubmitting}
        onClick={() => handleComplete(code)}
      />
    </div>
  );
};

export default VerificationForm;
