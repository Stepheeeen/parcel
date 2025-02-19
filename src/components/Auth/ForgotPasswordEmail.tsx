"use client";
import { useState } from "react";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { toast } from "@/hooks/use-toast";
import { Loader } from "../ui/custom/loader";
import { useRouter } from "next/navigation";

const ForgetPasswordEmail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email } = formData;

    if (!email || !validateEmail(email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/reset_password/${email}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Check your email for a password OTP.",
          variant: "default",
        });
        router.push("/authentication/create-password");
      } else {
        toast({
          title: "Error",
          description: data?.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md w-full md:max-w-lg mx-auto h-full md:h-auto shadow-md">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold mb-1 mx-1">Forgot Password?</h2>
      <p className="mb-6 md:mb-3 mx-1">
        Input your email address to reset your password.
      </p>
      <form
        className="flex flex-col gap-4 w-full my-4 mb-10 space-y-5"
        onSubmit={handleSubmit}
      >
        <InputField
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button label="Proceed" />
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

export default ForgetPasswordEmail;
