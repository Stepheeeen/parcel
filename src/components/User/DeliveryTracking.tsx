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

const DeliveryTracking = () => {
  const { user, accessToken } = useAuth();
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestOrder, setLatestOrder] = useState<IOrder | null>(null);

  const page = useRef(1);
  const limit = useRef(10);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!hasMore) return;

      try {
        const response = await fetch(
          `/api/orders?page=${page.current}&limit=${limit.current}`,
          {
            method: "GET",
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

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      {/* Container for larger screens */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mt-4">
          <Link href={"profile"} className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Avatar className="h-[70px] w-[70px] bg-purple-100">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${
                    user?.username || "Username"
                  }`}
                />
                <AvatarFallback>
                  {user
                    ? user?.username.charAt(0).toUpperCase() +
                      user?.username.charAt(1).toUpperCase()
                    : "UN"}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-2xl font-[500] hidden lg:block">
              {user?.username}
            </h1>
          </Link>
          <div className="flex space-x-4">
            <Link
              href={"/user/order"}
              className="px-6 py-3 bg-[#e8bc43] rounded-full flex items-center justify-center hover:bg-[#F9CA44] font-medium text-white transition-all"
            >
              <p className="text-lg mr-1">Create Order</p>
              <Plus size={25} />
            </Link>
          </div>
        </div>

        {/* Main content grid for larger screens */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-14">
          {/* Ongoing Delivery Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mt-6 lg:mt-0">Newest Order</h2>
            {latestOrder?._id ? (
              <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6">
                <div className="flex justify-between">
                  <span className="capitalize bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md">
                    {latestOrder?.paymentStatus}
                  </span>
                  <span className="text-gray-500">
                    {latestOrder?.updatedAt
                      ? getDate(new Date(latestOrder?.updatedAt))
                      : getDate(new Date())}
                  </span>
                </div>
                <h3 className="text-2xl font-bold my-2 lg:text-3xl capitalize">
                  {latestOrder?.status}
                </h3>
                <div className="flex items-center justify-between mt-4 gap-2">
                  {/* Status Indicator */}
                  {["picked", "delivery", "delivered"].map((status, index) => (
                    <React.Fragment key={status}>
                      <div className="flex flex-col items-center">
                        <FaCircle
                          size={16}
                          className={
                            ["picked", "delivery", "delivered"].indexOf(
                              latestOrder?.status
                            ) >= index
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }
                        />
                      </div>
                      {index < 2 && (
                        <div
                          className={`flex-grow h-[2px] ${
                            ["delivery", "delivered"].indexOf(
                              latestOrder?.status
                            ) > index
                              ? "bg-yellow-400"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-gray-500 mt-2 lg:mt-4">
                  Rider's Name:{" "}
                  <strong className="capitalize">
                    {latestOrder?.rider?.firstname +
                      " " +
                      latestOrder?.rider?.lastname}
                  </strong>
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6 text-center text-yellow-500">
                You are yet to place an order
              </div>
            )}
          </div>

          {/* Recently Delivered Section */}
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <a href="#" className="text-gray-500 hover:underline">
                See All
              </a>
            </div>

            {orders?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors bg-white shadow-sm p-4 mt-2 lg:p-6 space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <Package size={20} />
                  <div>
                    <p className="text-sm text-gray-500">ID Number</p>
                    <p className="font-bold">{item.orderId}</p>
                  </div>
                </div>
                <span
                  className={`capitalize font-medium ${
                    item.status === "delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
