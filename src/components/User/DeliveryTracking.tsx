"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bell, Plus, Package } from "lucide-react";
import Link from "next/link";
import { IUser, useAuth } from "@/context/AuthContext";
import { Loader } from "../ui/custom/loader";
import { getDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FaCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Types
interface IOrder {
  _id: string;
  orderId: string;
  receiverPhone: string;
  receiverName: string;
  receiversAddress: string;
  descr: string;
  sender: IUser;
  status: string;
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

// Header Component
const DashboardHeader = ({ user }: { user: IUser | null }) => (
  <div className="flex justify-between items-center mt-4">
    <Link href="profile" className="group flex items-center space-x-4">
      <div className="relative overflow-hidden rounded-full transition-transform group-hover:scale-105">
        <Avatar className="h-[70px] w-[70px] bg-purple-100">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${
              user?.username || "Username"
            }`}
          />
          <AvatarFallback>
            {user
              ? user.username.slice(0, 2).toUpperCase()
              : "UN"}
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
      <span className="text-lg mr-2">Create Order</span>
      <Plus className="w-5 h-5" />
    </Link>
  </div>
);

// Latest Order Component
const LatestOrder = ({ order }: { order: IOrder | null }) => (
  <div className="lg:col-span-2">
    <h2 className="text-xl font-semibold mt-6 lg:mt-0">Newest Order</h2>
    {order?._id ? (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mt-2 lg:p-6">
        <div className="flex justify-between">
          <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            {order.paymentStatus}
          </span>
          <span className="text-gray-500 text-sm">
            {order.updatedAt ? getDate(new Date(order.updatedAt)) : getDate(new Date())}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold my-4 lg:text-3xl capitalize">
          {order.status}
        </h3>
        
        <div className="flex items-center justify-between mt-6 gap-2">
          {["picked", "delivery", "delivered"].map((status, index) => (
            <React.Fragment key={status}>
              <div className="flex flex-col items-center">
                <FaCircle
                  size={16}
                  className={`transition-colors duration-300 ${
                    ["picked", "delivery", "delivered"].indexOf(order.status) >= index
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </div>
              {index < 2 && (
                <div
                  className={`flex-grow h-[2px] transition-colors duration-300 ${
                    ["delivery", "delivered"].indexOf(order.status) > index
                      ? "bg-yellow-400"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        <p className="text-gray-600 mt-4 lg:mt-6">
          Rider's Name:{" "}
          <span className="font-semibold capitalize">
            {`${order.rider?.firstname} ${order.rider?.lastname}`}
          </span>
        </p>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-md p-6 mt-2 text-center">
        <Package className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-yellow-500 font-medium">You are yet to place an order</p>
      </div>
    )}
  </div>
);

// Order Item Component
const OrderItem = ({ order }: { order: IOrder }) => (
  <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-6 mt-2">
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
        className={`capitalize font-medium px-3 py-1 rounded-full text-sm ${
          order.status === "delivered"
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
          setLatestOrder(data.docs[data.docs.length - 1]);
          setHasMore(data.hasMore);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch orders:", data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken, hasMore]);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader user={user} />
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-14">
          <LatestOrder order={latestOrder} />
          
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link href="#" className="text-gray-500 hover:text-gray-700 hover:underline transition-colors">
                See All
              </Link>
            </div>
            
            <div className="space-y-3">
              {orders?.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;