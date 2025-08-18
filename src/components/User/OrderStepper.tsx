"use client";
import React, { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  RefreshCw,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
import PaystackBrowserModal from "../ui/custom/PaystackBrowserModal";
import { Loader } from "../ui/custom/loader";

interface Address {
  id?: string;
  name: string;
  description?: string;
}

const OrderForm = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [order, setOrder] = useState<Parcel | null>(null);
  const [reference, setReference] = useState<string | undefined>(undefined);
  const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    fromLocation: "",
    toLocation: "",
  });

  const fallbackAddresses: Address[] = [
    { id: "fallback-1", name: "Adankolo" },
    { id: "fallback-2", name: "Army Barracks Area" },
    { id: "fallback-3", name: "Crowther Road" },
    { id: "fallback-4", name: "Crusher" },
    { id: "fallback-5", name: "FUL Axis" },
    { id: "fallback-6", name: "Felele" },
    { id: "fallback-7", name: "GRA" },
    { id: "fallback-8", name: "Gadumo" },
    { id: "fallback-9", name: "Ganaja" },
    { id: "fallback-10", name: "Kabawa" },
    { id: "fallback-11", name: "Kabba Junction" },
    { id: "fallback-12", name: "Kpata" },
    { id: "fallback-13", name: "Lokongoma Phase 2" },
    { id: "fallback-14", name: "Nataco" },
    { id: "fallback-15", name: "New Layout" },
    { id: "fallback-16", name: "Old Market" },
    { id: "fallback-17", name: "Paparanda Square" },
    { id: "fallback-18", name: "Phase 1" },
    { id: "fallback-19", name: "Post Office Area" },
    { id: "fallback-20", name: "Stadium Road" },
    { id: "fallback-21", name: "Zango" },
  ];

  const fetchAddresses = async () => {
    try {
      setAddressesLoading(true);
      const response = await fetch("/api/orders/addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
          const addressObjects = data.map(
            (addressName: string, index: number) => ({
              id: `address-${index}`,
              name: addressName,
            })
          );
          setAddresses(addressObjects);
        } else {
          console.warn("Unexpected addresses API response structure:", data);
          setAddresses(fallbackAddresses);
        }
      } else {
        toast({
          title: "Warning",
          description:
            data.error ||
            "Failed to fetch addresses. Using fallback locations.",
          variant: "destructive",
        });
        setAddresses(fallbackAddresses);
      }
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
      toast({
        title: "Warning",
        description: "Failed to fetch addresses. Using fallback locations.",
        variant: "destructive",
      });
      setAddresses(fallbackAddresses);
    } finally {
      setAddressesLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchAddresses();
    } else {
      setAddresses(fallbackAddresses);
    }
  }, [accessToken]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Package description is required";
    }
    if (!formData.receiverPhone.trim()) {
      newErrors.receiverPhone = "Receiver's phone number is required";
    }
    if (!formData.fromLocation) {
      newErrors.fromLocation = "Your location is required";
    }
    if (!formData.toLocation) {
      newErrors.toLocation = "Receiver's location is required";
    }
    if (
      formData.fromLocation === formData.toLocation &&
      formData.fromLocation
    ) {
      newErrors.toLocation =
        "Pickup and delivery locations must be different";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyPayment = async () => {
    try {
      setLoading(true);

      if (!reference) {
        toast({
          title: "Error",
          description: "Cannot find reference, are you sure you placed an order?",
        });
        return;
      }

      const response = await fetch(
        `/api/orders/verify_payment?reference=${reference}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Payment verified successfully. Your order is confirmed.",
        });
        router.replace("/user/home");
      } else {
        toast({
          title: "Payment Verification Failed",
          description: data.error || "Please try verifying again.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ? e.message : e,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = async () => {
    setOpenModal(false);
    await handleVerifyPayment();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create the new order
      const newOrderResponse = await fetch("/api/orders/new", {
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

      const orderData = await newOrderResponse.json();

      if (!newOrderResponse.ok) {
        toast({
          title: "Error creating order",
          description: orderData.error || "Cannot complete order",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setOrder(orderData);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ? e.message : e,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      // Step 2: Checkout the created order
      const checkoutResponse = await fetch(`/api/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          orderId: order?.orderId,
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok) {
        setReference(checkoutData.reference);
        setPaymentUrl(checkoutData.authorization_url);

        if (checkoutData.authorization_url) {
          setOpenModal(true);
        }
      }
    } catch (e: any) {
      toast({
        title: "Checkout Error",
        description: e?.message ? e.message : e,
        variant: "destructive",
      });
      console.error("Checkout error:", e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const refreshAddresses = async () => {
    if (accessToken) {
      await fetchAddresses();
    }
  };

  if (loading && !order) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-6">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden p-8 md:w-[58%]">
          {/* <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create a New Order
            </h2>
            <p className="text-gray-600">
              Fill out the details below to create your delivery order.
            </p>
          </div> */}

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* Package Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Package Information
                </h3>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package name *
                </label>
                <InputField
                  type="text"
                  name="packageName"
                  placeholder="Package Name (e.g., 'Textbooks')"
                  value={formData.packageName}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Package Description *"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full border p-4 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all resize-none h-14 ${errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Receiver Details Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Receiver Information
                </h3>
              </div>
              <div className="space-x-3 flex justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver's name *
                  </label>
                  <InputField
                    type="text"
                    name="receiverName"
                    placeholder="Name"
                    value={formData.receiverName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receiver's contact *
                  </label>
                  <InputField
                    type="tel"
                    name="receiverPhone"
                    placeholder="Phone Number"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                  />
                  {errors.receiverPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Pickup & Delivery
                </h3>
              </div>
              <div className="space-x-3 flex justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Location *
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("fromLocation", value)
                    }
                    disabled={addressesLoading}
                  >
                    <SelectTrigger
                      className={`w-full h-12 ${errors.fromLocation ? "border-red-500" : ""
                        }`}
                    >
                      <SelectValue
                        placeholder={
                          addressesLoading
                            ? "Loading addresses..."
                            : "Select pickup location"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {addressesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading addresses...
                        </SelectItem>
                      ) : addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <SelectItem
                            key={address.id || `address-${index}`}
                            value={address.name}
                          >
                            {address.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addresses" disabled>
                          No addresses available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  {errors.fromLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fromLocation}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Location *
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("toLocation", value)
                    }
                    disabled={addressesLoading}
                  >
                    <SelectTrigger
                      className={`w-full h-12 ${errors.toLocation ? "border-red-500" : ""
                        }`}
                    >
                      <SelectValue
                        placeholder={
                          addressesLoading
                            ? "Loading addresses..."
                            : "Select delivery location"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {addressesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading addresses...
                        </SelectItem>
                      ) : addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <SelectItem
                            key={address.id || `address-to-${index}`}
                            value={address.name}
                          >
                            {address.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addresses" disabled>
                          No addresses available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.toLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.toLocation}
                    </p>
                  )}
                </div>

                {addresses.length === 0 && !addressesLoading && (
                  <button
                    type="button"
                    onClick={refreshAddresses}
                    className="w-full py-3 px-4 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Loading Addresses
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-2 bg-[#e8bc43] hover:bg-[#f0c143] text-white text-lg rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Create Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-[40%]">
          {order ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-1">Order ID</p>
                  <p className="font-medium text-base text-gray-900">{order.orderId || "-"}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm font-medium text-gray-500 mb-1">Package Description</p>
                  <p className="font-medium text-base text-gray-900">{order.descr || "-"}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Receiver</p>
                    <p className="font-medium text-base text-gray-900">{order.receiverName || "-"}</p>
                    <p className="text-base text-gray-900">{order.receiverPhone || "-"}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Route</p>
                    <p className="font-medium text-base text-gray-900">From: {order.address || "-"}</p>
                    <p className="font-medium text-base text-gray-900">To: {order.receiversAddress || "-"}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Cost</p>
                    <p className="text-3xl font-bold text-green-600">₦{order.cost || "0"}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full px-8 py-2 bg-green-600 hover:bg-green-600/80 text-white text-lg rounded-lg flex items-center justify-center gap-2 transition-all duration-200 font-medium disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Chewckout
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Order Yet</h3>
              <p className="text-gray-500">
                Fill out the form to create your delivery order and see the summary here.
              </p>
            </div>
          )}
        </div>
      </div>

      {
        openModal && (
          <PaystackBrowserModal
            isOpen={openModal}
            onClose={closeModal}
            paymentUrl={paymentUrl as string}
            key={reference}
          />
        )
      }
    </div >
  );
};

export default OrderForm;