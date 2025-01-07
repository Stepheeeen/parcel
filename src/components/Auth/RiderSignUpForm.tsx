"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "../ui/custom/loader";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast({
        title: "Validation Error",
        description: "You have to agree to terms to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { firstname, lastname, email, password } = formData;

      const response = await fetch(`/api/riders/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (response.ok) {
        localStorage.setItem("v-email-auth", email);
        router.replace("/authentication/verify");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Registration failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-6 py-10 md:py-6 bg-white rounded-md w-full md:max-w-md mx-auto h-auto md:shadow-md">
        <h2 className="text-3xl font-bold mb-1">Let's Get Started</h2>
        <p className="mb-6">Fill in the fields to get started.</p>
        <form
          className="flex flex-col gap-4 w-full mt-7"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2">
            <InputField
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <InputField
              type="text"
              placeholder="Lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
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
          <InputField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2 my-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="cursor-pointer"
            />
            <p className="text-sm">
              I Agree to the Terms and Conditions & Privacy Policy
            </p>
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
              <p>Continue with Google</p>
            </div>
          }
          variant="secondary"
        />
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/authentication/signin" className="text-yellow-400">
            Sign In
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
