"use client"
import React, { useEffect, useRef, useState } from "react";
import { Bell, Plus, Package, Circle } from "lucide-react";
import { IUser, useAuth } from "@/context/AuthContext";
import { Loader } from "../ui/custom/loader";
import { getDate } from "@/lib/utils";

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
  const [orders, setOrders] = useState<IOrder[] | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [latestOrder, setLatestOrder] = useState<IOrder | null>(null)

  const page = useRef(1);
  const limit = useRef(10);


  useEffect(() => {
    const fetchOrders = async () => {
      if(!hasMore) return;
      const response = await fetch(`/api/orders?page=${page.current}&limit=${limit.current}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })

      const data = await response.json();

      if(response.ok){
        setOrders(data.docs);
        setLatestOrder(data.docs[data.docs.length -1])
        setHasMore(data.hasMore);
        setIsLoading(false);
      }else{
        setIsLoading(true);
      }
    }
    fetchOrders();
  }, [])


  return (
    isLoading ? (<Loader/>): (
      <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      {/* Container for larger screens */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Package size={32} />
            </div>
            <h1 className="text-2xl font-bold hidden lg:block">Delivery Dashboard</h1>
          </div>
          <div className="flex space-x-4">
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Plus size={20} />
            </button>
            <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main content grid for larger screens */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-8">
          {/* Ongoing Delivery Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mt-6 lg:mt-0">Newest Order</h2>
            <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6">
              <div className="flex justify-between">
                <span className="capitalize bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md">
                  {latestOrder?.paymentStatus}
                </span>
                <span className="text-gray-500">{latestOrder?.updatedAt ? getDate(new Date(latestOrder?.updatedAt)) : getDate(new Date())}</span>
              </div>
              <h3 className="text-2xl font-bold my-2 lg:text-3xl capitalize">{latestOrder?.status}</h3>
              <div className="flex justify-between mt-2 lg:mt-4">
                <div className="flex items-center space-x-1">
                  <Circle size={16} className={`${latestOrder?.status === "accepted" ?"text-gray-500": "text-yellow-500"} capitalize`} />
                  <span>Picked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Circle size={16} className={`${latestOrder?.status === "transit" ?"text-gray-500": "text-yellow-500"} capitalize`} />
                  <span>Delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Circle size={16} className={`${latestOrder?.status === "delivered" ?"text-gray-500": "text-yellow-500"} capitalize`} />
                  <span>Delivered</span>
                </div>
              </div>
              <p className="text-gray-500 mt-2 lg:mt-4">
                Rider's Name: <strong className="capitalize">Peter Kwankwanso</strong>
              </p>
            </div>
          </div>

          {/* Recently Delivered Section */}
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <a href="#" className="text-gray-500 hover:underline">
                See All
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6 space-y-4">
              {orders?.map((item) => (
                <div 
                  key={item._id} 
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID Number</p>
                      <p className="font-bold">{item.orderId}</p>
                    </div>
                  </div>
                  <span className={`capitalize ${item.status == "delivered" ? "text-green-500": (item.status == "pending" || "accepted" ? "text-yellow-500": "text-red-500")} font-medium`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
};

export default DeliveryTracking;