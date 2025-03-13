"use client";
import React, { useState } from "react";
import InputField from "../ui/InputField";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/interfaces/order.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaystackBrowserModal from "../ui/custom/PaystackBrowserModal";
import { Loader } from "../ui/custom/loader";

const steps = [
  { id: 1, title: "Package Details" },
  { id: 2, title: "Receiver Details" },
  { id: 3, title: "Location Details" },
  { id: 4, title: "Checkout Order" },
];

const Stepper = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();

  const router = useRouter();

  const [order, setOrder] = useState<Parcel | null>(null);

  const [reference, setReference] = useState<string | undefined>(undefined)
  const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined)

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    fromLocation: "",
    toLocation: "",
  });

  const handleVerifyPayment = async () => {
    try{
      setLoading(true);
      
      if(!reference) {
        toast({
          title: "Error",
          description: "Cannot find reference, are you sure you placed an order?"
        })
        return;
      }

        const response = await fetch(`/api/orders/verify_payment?reference=${reference}`, {
          method: "GET",
          headers: {"Authorization": `Bearer ${accessToken}`},
        })

        const data = await response.json();

        if(response.ok){
          router.replace("/user/home")
        }else{
          toast({
            title: "Error:",
            description: data.message,
            variant: "destructive",
          })
          return;
        }

      } catch (e: any) {
        toast({
          title: "Error",
          description: e?.message ? e.message: e,
          variant: "destructive"
        })
        return
      }finally{
        setLoading(false);
      }
  }

    const closeModal = async() => {
      setOpenModal(false)
      await handleVerifyPayment();
  }

 const handleCheckout = async () => {
  if (!order) {
    toast({
      title: "Error",
      description: "Complete order before you can checkout",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`/api/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        orderId: order.orderId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setReference(data.reference);
      setPaymentUrl(data.authorization_url);

      // Instead of checking paymentUrl, use the response data directly
      if (data.authorization_url) {
        setOpenModal(true);
      }
    } else {
      toast({
        title: "Error:",
        description: "Cannot generate checkout ID",
        variant: "destructive",
      });
      return;
    }
  } catch (e: any) {
    toast({
      title: "Error",
      description: e?.message ? e.message : e,
      variant: "destructive",
    });
    return;
  } finally {
    setLoading(false);
  }
};

  const handleNext = async () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);

    if (currentStep !== steps.length - 1) {
      // if(!formData.fromLocation || !formData.receiverPhone || !formData.toLocation || !formData.description || !formData.receiverName){
      return;
    } else {
      setLoading(true);

      if (!formData.description) {
        toast({
          title: "Validation Error",
          description: "Description is a required field",
          variant: "destructive",
        });
        return;
      }

      if (!formData.fromLocation) {
        toast({
          title: "Validation Error",
          description: "Your location is required",
          variant: "destructive",
        });
        return;
      }

      if (!formData.toLocation) {
        toast({
          title: "Validation Error",
          description: "Receiver's location is required",
          variant: "destructive",
        });
        return;
      }

      if (!formData.receiverPhone) {
        toast({
          title: "Validation Error",
          description: "Receiver's phone is required",
          variant: "destructive",
        });
      }

      try {
        const response = await fetch("/api/orders/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            address: formData.fromLocation,
            receiver: {
              name: formData.receiverName,
              phone: formData.receiverPhone,
              address: formData.toLocation,
            },
            descr: formData.description,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setOrder(data);
        } else {
          toast({
            title: "Error",
            description: data.message || "Cannot complete order",
            variant: "destructive",
          });
          return;
        }
      } catch (e: any) {
        toast({
          title: "Error",
          description: e?.message ? e.message : e,
          variant: "destructive",
        });
        return;
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const supportedLocations = [
    "Adankolo FUL Street",
    "Ganaja",
    "Crusher",
    "GRA",
    "Zone 8",
    "Kpata",
    "Cantonment",
    "Adankolo",
    "Zango",
    "Felele GT",
    "Felele Unique Hotel",
    "Felele",
    "Lokongoma",
    "Phase II",
  ]

  return (
    <div className="h-full md:min-h-screen w-full flex items-center md:justify-center">
    {
      loading ? (
        <Loader/>
      ): (
        <>
            <div className="w-full p-4 bg-white absolute top-0 left-0">
        <div onClick={()=>{router.back()}} className="cursor-pointer">
        <ArrowLeft className="w-6 h-6 text-black"/>
        </div>
      </div>
      <div className="rounded-2xl bg-white w-full max-w-2xl flex flex-col justify-between items-center shadow-none md:shadow-lg px-4 py-6 md:p-8">
        {/* Stepper Header */}
        <div className="w-full mb-8">
          <div className="hidden md:flex justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-green-500 scale-105"
                        : currentStep === step.id
                        ? "bg-[#F9CA44] scale-105 ring-4 ring-[#F9CA44]/20"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={
                          currentStep === step.id
                            ? "text-white font-medium"
                            : "text-gray-600"
                        }
                      >
                        {step.id}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <span className="mt-3 text-sm font-medium text-gray-700">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Stepper */}
          <div className="flex md:hidden justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-green-500"
                        : currentStep === step.id
                        ? "bg-[#F9CA44] ring-2 ring-[#F9CA44]/20"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span
                        className={
                          currentStep === step.id
                            ? "text-white text-sm"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {step.id}
                      </span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                        currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <span className="mt-2 text-xs font-medium text-gray-600 max-w-[60px] text-center">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full mb-8 min-h-[300px]">
          <div
            className={`transition-all duration-300 ${
              currentStep === 1 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-5">
              <InputField
                type="text"
                name="packageName"
                placeholder="Package Name"
                value={formData.packageName}
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Package Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all resize-none h-32"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-300 ${
              currentStep === 2 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-5">
              <InputField
                type="text"
                name="receiverName"
                placeholder="Receiver's Name"
                value={formData.receiverName}
                onChange={handleChange}
              />
              <InputField
                type="email"
                name="receiverEmail"
                placeholder="Receiver's Email (optional)"
                value={formData.receiverEmail}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="receiverPhone"
                placeholder="Receiver's Phone Number"
                value={formData.receiverPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-300 ${
              currentStep === 3 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-5">
              <Select
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "fromLocation", value },
                  } as any)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Location" />
                </SelectTrigger>
                <SelectContent>
                  {/* Location options */}
                  {supportedLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "toLocation", value } } as any)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To Location" />
                </SelectTrigger>
                <SelectContent>
                  {/* Location options */}
                  {supportedLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ${
              currentStep === 4 ? "block" : "hidden"
            }`}
          >
            {order ? (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {/* <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium text-gray-900">
                      {order.orderId || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Package Description</p>
                    <p className="font-medium text-gray-900">
                      {order.descr || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Receiver's Name</p>
                    <p className="font-medium text-gray-900">
                      {order.receiverName || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Receiver's Phone</p>
                    <p className="font-medium text-gray-900">
                      {order.receiverPhone || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From Address</p>
                    <p className="font-medium text-gray-900">
                      {order.address || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To Address</p>
                    <p className="font-medium text-gray-900">
                      {order.receiversAddress || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>
                    <p className="font-medium text-gray-900">
                      {order.status || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="font-medium text-gray-900">
                      ₦{order.cost || "0"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No order details available.
              </p>
            )}
          </div>
        </div>

      {/* Navigation */}
      <div className="flex justify-between items-center w-full pt-4 border-t">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-2.5 flex items-center gap-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors ${order?.cost ? "disabled": "active"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={currentStep === steps.length ? undefined : handleNext}
          className={`px-6 py-2.5 text-white rounded-lg items-center gap-2 transition-colors bg-[#F9CA44] hover:bg-[#f0c143]} ${currentStep !== steps.length ? "flex": "hidden"}`}
        > Next
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleCheckout}
          className={`px-6 py-2.5 text-white rounded-lg items-center gap-2 transition-colors bg-green-500 hover:bg-green-600 ${currentStep === steps.length ? "flex": "hidden"}`}
        >
          Checkout Order
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
        </>
      )
    }
    {openModal && <PaystackBrowserModal isOpen={openModal} onClose={closeModal} paymentUrl={paymentUrl as string} key={reference}></PaystackBrowserModal>}
     </div>
  );
};

export default Stepper;
