"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import delivery from "../../public/illustration/image.png";
import about from "../../public/authentication/white-bg.png";
import { useRouter } from "next/navigation";
import ParcelDelivery from '../../public/services/parcel-delivery.jpg'
import GuaranteedSafety from '../../public/services/guaranteed-safety.jpg'
import RealtimeTracking from '../../public/services/real-time-tracking.jpg'
import SamedayService from '../../public/services/same-day-service.jpg'
import Image from "next/image";
import { Package, Clock, MapPin, ShieldCheck, ArrowDownRight, ArrowRight, Instagram, Linkedin, Facebook, X, Twitter } from "lucide-react";
import cta from '../../public/bg/cta-bg.jpg'
import { PrivacyPolicyModal, TermsAndConditionsModal } from "@/components/Auth/TermsandPolicy";

const inter = Inter({ subsets: ["latin"] });

// Custom hook for intersection observer (remains the same)
import type { RefCallback } from "react";

const useIntersectionObserver = (
  options = {}
): [RefCallback<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options]);

  const ref = (node: HTMLDivElement | null) => {
    setElement(node);
  };

  return [ref, isIntersecting];
};

// Animation wrapper component (remains the same)
import type { ReactNode } from "react";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const FadeIn = ({ children, className = "", delay = 0 }: FadeInProps) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-7/12 max-w-6xl rounded-2xl bg-white/80 border border-gray-200 shadow-md backdrop-blur-md px-2 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}>
      {/* <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    > */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Package className="w-8 h-8 text-yellow-500" />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? "text-gray-900" : ""}`}>
                Parcel
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link href="#home" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-gray-900 hover:text-yellow-600"}`}>
                Home
              </Link>
              <Link href="#about" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-gray-900 hover:text-yellow-600"}`}>
                About
              </Link>
              <Link href="#service" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-gray-900 hover:text-yellow-600"}`}>
                Services
              </Link>
              {/* <Link href="#how-it-works" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-gray-900 hover:text-yellow-600"}`}>
                Get Started
              </Link> */}
              <Link href="#contact" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-gray-900 hover:text-yellow-600"}`}>
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
              onClick={() => router.push("/authentication/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const router = useRouter();
  return (
    <section
      id="home"
      className="relative scroll pt-20 overflow-hidden bg-white h-screen" // Removed bg-gradient classes
    >

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 place-items-center">
          <div className="text-center pt-16">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-normal tracking-tight">
                Fast and Reliable <br />
                <span className="bg-yellow-400 rounded">Delivery </span>Service
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed my-4 text-center mx-auto">
                Send packages across Lokoja city with tracking and guaranteed
                delivery. <br /> The future of logistics.
              </p>
              {/* <div className="flex flex-row items-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1"
                  onClick={() => router.push("/authentication/signup")}
                >
                  Send Parcel Now
                </button>
              </div> */}
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div className="w-full">
              <Image
                src={delivery}
                alt="Delivery Illustration"
                className="h-2/3"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
const AboutSection = () => {
  const router = useRouter();
  return (
    <section
      id="about"
      className="relative scroll overflow-hidden bg-orange-50 h-screen w-full flex justify-center items-center rounded-3xl mt-12" // Removed bg-gradient classes
    >
      <div className="max-w-full mx-auto pl-4 lg:pl-8 absolute z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-x-4">
          <FadeIn>
            <h1 className="text-4xl md:text-7xl font-extrabold leading-normal tracking-tight mb-4">
              <span className="bg-yellow-400 rounded">About </span>Us
            </h1>
            <div className="mt-8">
              {/* <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-normal tracking-tight">
                Fast and Reliable <br />
                <span className="bg-yellow-400 rounded">Delivery </span>Service
              </h1> */}
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At <span className="font-semibold text-gray-900">Parcel</span>, we
                make local deliveries simple, reliable, and transparent. Our mission
                is to help individuals and businesses send packages{" "}
                <span className="font-medium text-yellow-600">
                  seamlessly across Lokoja city
                </span>
                , backed by real-time tracking and guaranteed delivery.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We believe the <span className="font-semibold">future of logistics</span>{" "}
                is built on trust, speed, and technology. That’s why we combine a
                dedicated delivery network with smart tools that give you full
                visibility from pickup to drop-off.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether it’s a personal item or a business shipment, Parcel ensures
                that every delivery is handled with care, efficiency, and
                accountability. We’re more than just a courier — we’re your logistics
                partner for the modern city.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative w-full h-screen">
              {/* Background Image */}
              <Image
                src={about}
                alt="About Illustration"
                className="w-full h-full object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute bg-white/50" />

              {/* Centered Content */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex items-center bg-white px-10 py-6">
                  <Package className="w-32 h-32 text-gray-900" />
                  <span className="ml-4 text-7xl font-extrabold text-gray-900">
                    Parcel
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
const ServiceSection = () => {
  return (
    <section id="service" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-extrabold leading-normal tracking-tight mb-4">
              Our<span className="bg-yellow-400 rounded"> Services </span>
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 w-10/12 mx-auto my-14">
          <FadeIn>

            <div className="flex w-full items-center justify-between gap-8">
              <div className="w-[60%] border border-1 border-gray-600 rounded-3xl h-[400px] bg-amber-50 flex justify-between items-center p-8 gap-6">
                <div className="w-full h-full">
                  <Image
                    alt="parcel delivery"
                    src={ParcelDelivery}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Parcel Delivery</h2>
                  <p>Fast, secure, and reliable delivery of packages across Lokoja city with full tracking support.</p>
                </div>
              </div>
              <div className="w-[40%] border border-1 border-gray-600 rounded-3xl h-[400px] bg-yellow-100 p-8 space-y-8">
                <div className="w-full h-1/2">
                  <Image
                    alt="parcel delivery"
                    src={RealtimeTracking}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Real-Time Tracking</h2>
                  <p>Know exactly where your package is with live GPS tracking updates from pickup to delivery.</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex w-full items-center justify-between gap-8">
              <div className="w-[40%] border border-1 border-gray-600 rounded-3xl h-[400px] bg-yellow-100 p-8 space-y-8">
                <div className="w-full h-1/2">
                  <Image
                    alt="same day service"
                    src={SamedayService}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Same-Day Service</h2>
                  <p>Get your parcels delivered the same day — perfect for urgent items and business needs.</p>
                </div>
              </div>
              <div className="w-[60%] border border-1 border-gray-600 rounded-3xl h-[400px] bg-amber-50 flex justify-between items-center p-8 gap-6">
                <div className="w-full h-full">
                  <Image
                    alt="parcel delivery"
                    src={GuaranteedSafety}
                    width={100}
                    height={100}
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Guaranteed Safety</h2>
                  <p>Every package is handled with care, ensuring safe delivery with our trusted team.</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Place Order",
      description: "Tell us pickup and drop-off locations through our easy-to-use platform.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Instant Pickup",
      description: "Our professional team collects your parcel promptly from your specified location.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H14a2 2 0 01-2-2V7z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Fast Delivery",
      description: "Your parcel is delivered safely within 2-4 hours anywhere in Lokoja.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-orange-500 to-red-600"
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-extrabold leading-normal tracking-tight mb-4">
          How It <span className="bg-yellow-400 rounded pr-4">Works</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-10/12 mx-auto my-14">
          {steps.map((step, index) => (
            <FadeIn key={step.id}>
              <div className="relative group">
                {/* Main card */}
                <div
                  className={`w-full border border-1 border-gray-600 rounded-3xl h-[450px] ${index === 0 ? "bg-amber-50 " : index === 3 ? "bg-amber-50" : "bg-yellow-100"} p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-lg transition-shadow duration-300`}
                >

                  <Image
                    src={step.backgroundImage}
                    alt="Background"
                    className="w-4/5 h-[180px] rounded-3xl mb-10 object-cover"
                    width={100}
                    height={100}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-2">
                      Step {index + 1}
                    </div>

                    {/* Text content */}
                    <h3 className="text-2xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Clock size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Swift Delivery",
      description: "Get your parcels delivered in 2-4 hours, right on time, every time within Lokoja.",
    },
    {
      icon: <MapPin size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Lokoja-Wide Coverage",
      description: "From Ganaja to Zango, our network covers every corner of the city, ensuring no location is out of reach.",
    },
    {
      icon: <ShieldCheck size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Unwavering Reliability",
      description: "Count on us for secure handling and dependable service, trusted by countless individuals and businesses.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Your Go-To Delivery Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              We're more than just a delivery service; we're your partner in
              getting things done quickly and reliably across Lokoja.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


const BusinessCTASection = () => {
  return (
    <section
      className="p-16 w-11/12 mx-auto rounded-3xl my-20 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${cta.src})` }}
      id="contact"
    >
      <div className="absolute w-full h-full bg-black/50 top-0 left-0 rounded-3xl" />
      <FadeIn delay={200}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-start">
            <h2 className="text-5xl font-extrabold text-white mb-6">
              Own a Business?
            </h2>
            <p className="text-lg text-white max-w-2xl">
              Be it a startup or an established company, Partner with Parcel for reliable and efficient business deliveries.
            </p>
          </div>
          <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1">
            <Link href="mailto:hello@theparcel.com.ng">Contact Us</Link>
          </button>
        </div>
      </FadeIn>
    </section>
  );
};

// Footer Component
const Footer = ({
  onOpenTermsModal,
  onOpenPrivacyModal,
}: {
  onOpenTermsModal: () => void;
  onOpenPrivacyModal: () => void;
}) => {
  return (
    // <footer id="contact" className="text-black py-12">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    //       <div>
    //         <div className="flex items-center mb-4">
    //           <Package className="w-6 h-6 text-yellow-500" />
    //           <span className="ml-2 text-lg font-bold">Parcel</span>
    //         </div>
    //         <p className="text-gray-400 text-sm">
    //           Your trusted logistics partner in Lokoja.
    //         </p>
    //       </div>
    //       <div>
    //         <h4 className="text-sm font-semibold text-gray-300 mb-2">Quick Links</h4>
    //         <ul className="text-gray-400 text-sm space-y-2">
    //           <li><Link href="#">Home</Link></li>
    //           <li><Link href="#">About Us</Link></li>
    //           <li><Link href="#">Services</Link></li>
    //           <li><Link href="#">How it works</Link></li>
    //           <li><Link href="#">Sign In</Link></li>
    //           <li><Link href="#">Become a rider</Link></li>
    //           <li><Link href="#">Become a vendor</Link></li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="text-sm font-semibold text-gray-300 mb-2">Support</h4>
    //         <ul className="text-gray-400 text-sm space-y-2">
    //           <li><button onClick={onOpenTermsModal} className="text-left">Terms & Conditions</button></li>
    //           <li><button onClick={onOpenPrivacyModal} className="text-left">Privacy Policy</button></li>
    //           <li><Link href="#">Contact Support</Link></li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="text-sm font-semibold text-gray-300 mb-2">Contact</h4>
    //         <p className="text-gray-400 text-sm">📍 Lokoja, Nigeria</p>
    //         <p className="text-gray-400 text-sm">📞 +234 70XXXXXXXX</p>
    //         <p className="text-gray-400 text-sm">✉️ hello@theparcel.com.ng</p>
    //       </div>
    //     </div>
    //     <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
    //       &copy; {new Date().getFullYear()} Parcel. All rights reserved.
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-white text-black py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {/* Replace with your own logo */}
              <Package className="w-8 h-8 text-yellow-500" />
              <span className="ml-2 text-lg font-bold">Parcel</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted logistics partner in Lokoja.
            </p>
          </div>

          {/* Quick Links (Products style) */}
          <div>
            <h4 className="text-sm font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="#" className="text-left hover:underline">Home</Link></li>
              <li><Link href="#" className="text-left hover:underline">Sign In</Link></li>
              <li><Link href="#" className="text-left hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-left hover:underline">Services</Link></li>
              <li><Link href="#" className="text-left hover:underline">Own a Store</Link></li>
              <li><Link href="#" className="text-left hover:underline">How it works</Link></li>
              <li><Link href="#" className="text-left hover:underline">Register as a rider</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <button onClick={onOpenTermsModal} className="text-left hover:underline">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacyModal} className="text-left hover:underline">
                  Privacy Policy
                </button>
              </li>
              <li><Link href="https://wa.me/2349037311304" className="text-left hover:underline">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold mb-4">CONTACT</h4>
            <Link href={'https://www.google.com/maps/place/Lokoja'} className="text-sm text-gray-700 hover:underline">📍 Lokoja, Nigeria</Link> <br />
            <Link href={'tel:+2349037311304'} className="text-sm text-gray-700 hover:underline">📞 +234 9037311304</Link> <br />
            <Link href={'mailto:hello@theparcel.com.ng'} className="text-sm text-gray-700 hover:underline">✉️ hello@theparcel.com.ng</Link>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold mb-4">FOLLOW US</h4>
            <div className="flex space-x-4 text-gray-700">
              <Link href="#"><FaInstagram className="w-5 h-5" /></Link>
              <Link href="#"><FaTiktok className="w-5 h-5" /></Link>
              <Link href="#"><FaTwitter className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Parcel. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <button onClick={onOpenPrivacyModal} className="hover:underline">
              Privacy Policy
            </button>
            <span>&</span>
            <button onClick={onOpenTermsModal} className="hover:underline">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function ParcelApp() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleOpenTermsModal = () => setIsTermsModalOpen(true);
  const handleCloseTermsModal = () => setIsTermsModalOpen(false);
  const handleOpenPrivacyPolicyModal = () => setPrivacyPolicyOpen(true);
  const handleClosePrivacyPolicyModal = () => setPrivacyPolicyOpen(false);

  return (
    <div className={`min-h-screen ${inter.className}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <HowItWorksSection />
      {/* <WhyChooseUsSection /> */}
      <BusinessCTASection />
      <Footer
        onOpenTermsModal={handleOpenTermsModal}
        onOpenPrivacyModal={handleOpenPrivacyPolicyModal}
      />

      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={handleCloseTermsModal}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={handleClosePrivacyPolicyModal}
      />
    </div>
  );
}

