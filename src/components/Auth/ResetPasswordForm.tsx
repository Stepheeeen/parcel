"use client";
import { useState } from "react";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { Loader } from "../ui/custom/loader";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          password,
        }),
      });
      console.log()
      if (!response.ok) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } else {
        router.replace("/authentication/signin");
      }

      const data = await response.json();
      console.log("Password reset success:", data);
      // Handle success (e.g., redirect user or show confirmation message)
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md w-full md:max-w-md mx-auto h-full md:h-auto shadow-md">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold mb-1 mx-1">Create Password</h2>
      <p className="mb-6 md:mb-3 mx-1">Input a new password</p>
      <form
        className="flex flex-col gap-4 w-full my-4 mb-10"
        onSubmit={handleSubmit}
      >
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Input OTP"
          value={otp}
          onChange={(e: any) => setOtp(e.target.value)}
        />
        <div className="mt-7"/>
        <Button label={"Reset Password"} />
      </form>
      <p className="text-center text-sm mt-4">
        Already Have An Account?{" "}
        <a href="/authentication/signin" className="text-yellow-400">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
