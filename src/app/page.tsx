"use client";
import React from "react";
import {
  Bell,
  Package,
  Truck,
  Clock,
  Shield,
  ChevronRight,
  MapPin,
  Star,
  Mail,
  Phone,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/custom/button";
import { LoginButton } from "@/components/ui/custom/LoginButton";

const LandingPage = () => {
  const router = useRouter();

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "Same Day Delivery",
      description:
        "Get your packages delivered within minutes or just a few hours, not days. We prioritize speed without compromising safety.",
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      title: "Secure Shipping",
      description:
        "End-to-end package tracking. Your items are protected throughout their journey.",
    },
    {
      icon: <Truck className="w-8 h-8 text-yellow-500" />,
      title: "Citywide Coverage",
      description:
        "Delivery services available across Lokoja city, reaching even the most remote locations.",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Schedule Pickup",
      description:
        "Book a pickup at your convenience through our easy-to-use platform.",
      icon: <MapPin className="w-6 h-6 text-yellow-500" />,
    },
    {
      step: 2,
      title: "Package Handling",
      description:
        "Your package is carefully handled by our trained professionals.",
      icon: <Package className="w-6 h-6 text-yellow-500" />,
    },
    {
      step: 3,
      title: "Timely Delivery",
      description: "We deliver to the destination on time, every time.",
      icon: <Truck className="w-6 h-6 text-yellow-500" />,
    },
  ];

  const testimonials = [
    {
      name: "Esther",
      review:
        "Parcel's service is unmatched. My package arrived on time and in perfect condition! The tracking feature kept me informed throughout the delivery process.",
      location: "Adankolo, Lokoja",
      rating: 5,
    },
    {
      name: "Abass",
      review:
        "I love the real-time tracking feature. It gives me peace of mind knowing the status of my package at all times. The customer service is exceptional!",
      location: "Ganaja, Lokoja",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <Package className="h-10 w-10 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">Parcel</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Contact
              </a>
            </div>
            {/* className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all" */}

            <div className="w-[200px]">
              <Button
                label={"Become a Rider"}
                onClick={() => router.push("/authentication/signup/rider")}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-yellow-50 pt-20">
        <div className="max-w-7xl mx-auto">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left pb-16">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Fast and Reliable</span>
                <span className="block text-yellow-500">Delivery Service</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Send packages across the country with real-time tracking and
                guaranteed delivery times. Experience the future of logistics
                with Parcel.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start md:space-x-4">
                <div className="w-[230px] md:w-[300px]">
                  <Button
                    label={
                      <div className="flex items-center justify-center">
                        Create Account
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </div>
                    }
                    // className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => router.push("/authentication/signup")}
                  />
                </div>
                <button
                  className="mt-3 sm:mt-0 px-16 text-lg md:w-auto bg-white py-3 rounded-full font-semibold shadow hover:shadow-xl transition-all w-[230px]"
                  onClick={() => router.push("/authentication/signin")}
                >
                  Login
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Parcel?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We provide the fastest and most reliable delivery service in the
              market
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center">
                  {feature.icon}
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Simple steps to get your package delivered
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.step}
                className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-500">
                    {step.step}
                  </span>
                </div>
                <div className="mt-4 flex justify-center">{step.icon}</div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Don't just take our word for it
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 italic">
                  "{testimonial.review}"
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We're here to help with your delivery needs
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Phone className="w-8 h-8 text-yellow-500" />
              <h3 className="mt-4 text-xl font-semibold">Phone</h3>
              <p className="mt-2 text-gray-600">+234 123 456 7890</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Mail className="w-8 h-8 text-yellow-500" />
              <h3 className="mt-4 text-xl font-semibold">Email</h3>
              <p className="mt-2 text-gray-600">support@parcel.com</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <MapPin className="w-8 h-8 text-yellow-500" />
              <h3 className="mt-4 text-xl font-semibold">Location</h3>
              <p className="mt-2 text-gray-600">Lokoja, Nigeria</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
            <div>
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold text-white">Parcel</span>
              </div>
              <p className="mt-4">
                Making delivery simple and efficient across Lokoja city.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    Same Day Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    Express Shipping
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors"
                  >
                    International
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> +234 123 456 7890
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> support@parcel.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Lokoja, Nigeria
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Parcel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
