"use client";

import { FcGoogle } from "react-icons/fc";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader } from "../ui/custom/loader";
import { useAuth } from "@/context/AuthContext";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: `${!email ? "Email" : "Password"} is a required field.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_data", JSON.stringify(data));
        login(data.user, data.accessToken, data.refreshToken);
      } else {
        toast({
          title: "Error",
          description: data.error || "Login failed.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-6 py-10 md:py-6 bg-white rounded-md w-full md:max-w-md mx-auto md:shadow-md">
        <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
        <p className="mb-6">Login to your account.</p>
        <form
          className="flex flex-col gap-5 w-full mt-10 md:mt-7"
          onSubmit={handleSubmit}
        >
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="w-full">
            <a
              href="/authentication/forget-password"
              className="text-md text-yellow-400 float-right my-2"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mb-[50px] md:mb-2" />

          <Button label="Proceed" />
        </form>
        <div className="text-center my-2 text-sm">Or</div>
        <Button
          disabled
          label={
            <div className="flex items-center justify-center gap-3">
              <FcGoogle size={20} />
              <p>Continue With Google</p>
            </div>
          }
          variant="secondary"
        />
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/authentication/signup" className="text-yellow-400">
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
