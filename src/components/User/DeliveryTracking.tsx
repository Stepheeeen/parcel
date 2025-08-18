"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bell, Plus, Package, Receipt } from "lucide-react";
import Link from "next/link";
import { IUser, useAuth } from "@/context/AuthContext";
import { Loader } from "../ui/custom/loader";
import { getDate } from "@/lib/utils";
import { FaCircle } from "react-icons/fa"; // Make sure this is imported
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import PaystackBrowserModal from "../ui/custom/PaystackBrowserModal";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Types remain the same
interface IOrder {
  _id: string;
  orderId: string;
  receiverPhone: string;
  receiverName: string;
  receiversAddress: string;
  descr: string;
  sender: IUser;
  status: string; // Keep as string, but we'll use specific values for logic
  paymentStatus: string;
  receiver?: IUser;
  timeOfArrival?: Date;
  cost: string;
  address: string;
  rider: IUser;
  gatewayPaymentId?: string;
  externalReference?: string;
  authorizationCode?: string;
  updatedAt: Date;
  createdAt: Date;
}

const ReceiptModal = ({
  order,
  isOpen,
  onClose,
}: {
  order: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [reference, setReference] = useState<string | undefined>(undefined);
  const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleVerifyPayment = async () => {
    try {
      setLoading(true);

      if (!reference) {
        toast({
          title: "Error",
          description:
            "Cannot find reference, are you sure you placed an order?",
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
        router.replace("/user/home");
      } else {
        toast({
          title: "Error:",
          description: data.error,
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
  const closeModal = async () => {
    setOpenModal(false);
    await handleVerifyPayment();
  };
  const handleCheckout = async () => {
    onClose;
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
        if (paymentUrl) {
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
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {loading && <Loader />}
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#F9CA44]" />
            Order Receipt
          </AlertDialogTitle>
          <AlertDialogDescription>
            {order && (
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{order.orderId}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {getDate(new Date(order.createdAt))}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`capitalize px-2 py-1 rounded-full text-sm font-medium ${order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Payment Status:</span>
                    <span
                      className={`capitalize font-medium ${order.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Delivery Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Receiver:</span>
                      <span className="font-medium">{order.receiverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{order.receiverPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium text-right">
                        {order.receiversAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Rider Information</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium capitalize">
                      {`${order.rider?.firstname || ""} ${order.rider?.lastname || "N/A"
                        }`}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Cost</span>
                    <span className="text-xl font-bold text-black">
                      ₦{new Intl.NumberFormat().format(parseInt(order.cost))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center justify-between w-full">
          {/* Checkout Button (visible only if paymentStatus is unpaid) */}
          {order?.paymentStatus !== "paid" && (
            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors" onClick={() => {
              handleCheckout()
              onClose()
            }}>
              Checkout Order
            </button>
          )}

          {/* Close Button */}
          <AlertDialogCancel className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
      {openModal && (
        <PaystackBrowserModal
          isOpen={openModal}
          onClose={closeModal}
          paymentUrl={paymentUrl as string}
          key={reference}
        ></PaystackBrowserModal>
      )}
    </AlertDialog>
  );
};

// Header Component
const DashboardHeader = ({ user }: { user: IUser | null }) => (
  <div className="flex justify-between items-center mt-4">
    <Link href="profile" className="group flex items-center space-x-4">
      <div className="relative overflow-hidden rounded-full transition-transform group-hover:scale-105">
        <Avatar className="h-[70px] w-[70px] bg-purple-100">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username || "Username"
              }`}
          />
          <AvatarFallback>
            {user ? user.username.slice(0, 2).toUpperCase() : "UN"}
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-2xl font-medium hidden lg:block group-hover:text-gray-700">
        {user?.username}
      </h1>
    </Link>

    <Link
      href="/user/order"
      className="px-6 py-3 bg-[#e8bc43] rounded-full flex items-center justify-center hover:bg-[#F9CA44] hover:shadow-md font-medium text-white transition-all duration-300"
    >
      <span className="text-lg mr-2">Initiate Delivery</span>
      <Plus className="w-5 h-5" />
    </Link>
  </div>
);

// Latest Order Component
const LatestOrder = ({ order }: { order: IOrder | null }) => {
  // Helper function to determine the color of the circles
  const getCircleColor = (circleIndex: number, orderStatus: string) => {
    const statusOrder = ["pending", "accepted", "delivered"];
    const currentStatusIndex = statusOrder.indexOf(orderStatus);

    if (orderStatus === "delivered") {
      return "text-green-500";
    }

    // Otherwise, apply previous logic (yellow for active/past, gray for future)
    if (circleIndex <= currentStatusIndex) {
      return "text-yellow-500"; // Yellow for pending/accepted or prior steps
    }
    return "text-gray-300";
  };

  // Helper function to determine the color of the lines
  const getLineColor = (lineIndex: number, orderStatus: string) => {
    const statusOrder = ["pending", "accepted", "delivered"];
    const currentStatusIndex = statusOrder.indexOf(orderStatus);

    if (orderStatus === "delivered") {
      return "bg-green-400";
    }

    if (lineIndex < currentStatusIndex) {
      return "bg-yellow-400"; // Yellow for completed lines (before current active status)
    } else if (lineIndex === currentStatusIndex && orderStatus === "accepted") {
      return "bg-yellow-400"; // The line segment leading to 'accepted' is yellow
    }
    return "bg-gray-200";
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mt-6 lg:mt-0">Newest Deliveries</h2>
      {order?._id ? (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mt-2 lg:p-6">
          <div className="flex justify-between">
            <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              {order.paymentStatus}
            </span>
            <span className="text-gray-500 text-sm">
              {order.updatedAt
                ? getDate(new Date(order.updatedAt))
                : getDate(new Date())}
            </span>
          </div>

          <h3 className="text-2xl font-bold my-4 lg:text-3xl capitalize">
            {order.status}
          </h3>

          <div className="flex items-center justify-between mt-6 gap-2">
            {["pending", "accepted", "delivered"].map((status, index) => (
              <React.Fragment key={status}>
                <div className="flex flex-col items-center">
                  <FaCircle
                    size={16}
                    className={`transition-colors duration-300 ${getCircleColor(
                      index,
                      order.status
                    )}`}
                  />
                </div>
                {index < 2 && (
                  <div
                    className={`flex-grow h-[2px] transition-colors duration-300 ${getLineColor(
                      index,
                      order.status
                    )}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Conditional display for Rider's Name */}
          {(order.status === "accepted" || order.status === "delivered") &&
            order.rider && (
              <p className="text-gray-600 mt-4 lg:mt-6">
                Rider's Name:{" "}
                <span className="font-semibold capitalize">
                  {order.rider?.firstname || ""}{" "}
                  {order.rider?.lastname || "N/A"}
                </span>
              </p>
            )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 mt-2 text-center">
          <Package className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-yellow-500 font-medium">
            You haven't requested any deliveries yet.
          </p>
        </div>
      )}
    </div>
  );
};

// Order Item Component
const OrderItem = ({
  order,
  onClick,
}: {
  order: IOrder;
  onClick: () => void;
}) => (
  <div
    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-6 mt-2 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
          <Package className="w-7 h-7 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">ID Number</p>
          <p className="font-bold">{order.orderId}</p>
        </div>
      </div>
      <span
        className={`capitalize font-medium px-3 py-1 rounded-full text-sm ${order.status === "delivered"
            ? "bg-green-50 text-green-600"
            : "bg-yellow-50 text-yellow-600"
          }`}
      >
        {order.status}
      </span>
    </div>
  </div>
);

// Main Component
const DeliveryTracking = () => {
  const { user, accessToken } = useAuth();
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestOrder, setLatestOrder] = useState<IOrder | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const page = useRef(1);
  const limit = useRef(10);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!hasMore) return;

      try {
        const response = await fetch(
          `/api/orders?page=${page.current}&limit=${limit.current}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data.docs);
          setLatestOrder(data.docs[0]);
          setHasMore(data.hasMore);
          setIsLoading(false);
        } else {
          // console.error("Failed to fetch orders:", data.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken, hasMore]);

  const handleOrderClick = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader user={user} />

        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-14">
          <LatestOrder order={latestOrder} />

          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Deliveries</h2>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-700 hover:underline transition-colors"
              >
                See All
              </Link>
            </div>

            <div className="space-y-3">
              {orders?.map((order) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  onClick={() => handleOrderClick(order)}
                />
              ))}
            </div>
          </div>
        </div>

        <ReceiptModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default DeliveryTracking;
