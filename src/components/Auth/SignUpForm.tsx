"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/custom/loader";
import { MessageDisplay } from "./SignInForm";
import backgroundImage from "../../../public/authentication/black-bg.png";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import backgroundImageMobile from "../../../public/authentication/white-bg.png"
import { PrivacyPolicyModal } from "./TermsandPolicy";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
    isVisible: boolean;
  }>({
    text: "",
    type: "error",
    isVisible: false,
  });

  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const handleClosePrivacyPolicyModal = () => {
    setIsPrivacyPolicyOpen(false);
  };

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    numeric: false,
    specialChar: false,
  });

  const passwordRegex = {
    minLength: /.{6,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numeric: /\d/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (password: string) => {
    const newCriteria = {
      minLength: passwordRegex.minLength.test(password),
      uppercase: passwordRegex.uppercase.test(password),
      lowercase: passwordRegex.lowercase.test(password),
      numeric: passwordRegex.numeric.test(password),
      specialChar: passwordRegex.specialChar.test(password),
    };

    setPasswordCriteria(newCriteria);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setMessage({
        text: "You have to agree to the terms to proceed.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    if (Object.values(passwordCriteria).includes(false)) {
      setMessage({
        text: "Password does not meet all the required criteria.",
        type: "error",
        isVisible: true,
      });
      return;
    }

    setLoading(true);
    setMessage({ ...message, isVisible: false });

    try {
      const { email, phone, password, username } = formData;

      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("v-email-auth", email);
        localStorage.setItem("next-route", "/user/home");
        router.replace("/authentication/verify");
      } else {
        setMessage({
          text: data.error || data.message,
          type: "error",
          isVisible: true,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage({
        text: "Something went wrong. Please try again later.",
        type: "error",
        isVisible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center h-[100vh]">
        <div className="bg-white overflow-hidden w-full h-full flex">
          {/* Left Panel */}
          <div className="hidden md:flex md:w-2/3 text-yellow-400 p-12 flex-col justify-center items-center relative">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={backgroundImage}
                alt="Sign In Background"
                layout="fill"
                objectFit="cover"
              // className="opacity-50"
              />
            </div>
            <div className="z-10 text-center text-white">
              <h2 className="text-6xl font-bold mb-4">Parcel</h2>
              <p className="text-2xl mb-8 opacity-90 leading-relaxed">
                Quick signup, access your dashboard instantly, initiate and view
                deliveries.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full h-full grid place-items-center md:w-1/2 overflow-y-scroll pb-5 md:p-12">
            <div className="absolute inset-0 bg-black bg-opacity-10 w-full h-[100vh] md:hidden">
              <Image
                src={backgroundImageMobile}
                alt="Sign In Background"
                layout="fill"
                objectFit="cover"
                className="opacity-30"
              />
            </div>
            <div className="w-full bg-white z-10 p-5 md:w-3/4 mx-auto shadow-md md:shadow-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h2>

              <form
                className="flex flex-col gap-4 w-full mt-7"
                onSubmit={handleSubmit}
              >
                <InputField
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <InputField
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
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

                {/* Password Criteria */}
                {formData.password && (
                  <div className="text-sm text-gray-700 ">
                    <ul className="space-y-1 flex flex-row flex-wrap gap-x-2">
                      <li className="flex items-center gap-2 border border-gray-200 shadow-sm bg-gray-50 px-4 rounded-full">
                        {getIcon(passwordCriteria.minLength)} At least 6
                        characters
                      </li>
                      <li className="flex items-center gap-2 border border-gray-200 shadow-sm bg-gray-50 px-4 rounded-full">
                        {getIcon(passwordCriteria.uppercase)} One uppercase
                        letter
                      </li>
                      <li className="flex items-center gap-2 border border-gray-200 shadow-sm bg-gray-50 px-4 rounded-full">
                        {getIcon(passwordCriteria.lowercase)} One lowercase
                        letter
                      </li>
                      <li className="flex items-center gap-2 border border-gray-200 shadow-sm bg-gray-50 px-4 rounded-full">
                        {getIcon(passwordCriteria.numeric)} One number
                      </li>
                      <li className="flex items-center gap-2 border border-gray-200 shadow-sm bg-gray-50 px-4 rounded-full">
                        {getIcon(passwordCriteria.specialChar)} One special
                        character
                      </li>
                    </ul>
                  </div>
                )}

                <MessageDisplay
                  message={message.text}
                  type={message.type}
                  isVisible={message.isVisible}
                />

                <div className="flex items-center gap-2 my-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <p className="text-sm ">
                    I agree to the <span className="text-yellow-500 underline" onClick={() => setIsPrivacyPolicyOpen(true)}>Terms and Conditions & Privacy Policy</span>
                  </p>
                </div>

                {/* <div className="mb-[50px] md:mb-2" /> */}
                <Button label="Sign Up" />
              </form>

              <div className="mt-6 text-center">
                <a
                  href="/authentication/forget-password"
                  className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/authentication/signin"
                    className="text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={handleClosePrivacyPolicyModal}
      />
    </>
  );
};

export default SignUpForm;
