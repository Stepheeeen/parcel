"use client";

import React, { useEffect, useRef, useState } from "react";
import { Wallet, ArrowDownCircle, Plus, Receipt, Package } from "lucide-react";
import Link from "next/link";
import { IUser, useAuth } from "@/context/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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

interface IWallet {
  balance: number;
  updatedAt: Date;
  createdAt: Date;
  rider: any;
}

interface IWalletAndTransactions {
  orders: IOrder[];
  completedOrders: number;
  notDeliveredOrders: number;
  wallet: IWallet
}


// Header Component
const DashboardHeader = ({ user }: { user: IUser | null }) => (
  <div className="flex justify-between items-center mt-4">
    <Link href="profile" className="group flex items-center space-x-4">
      <div className="relative overflow-hidden rounded-full transition-transform group-hover:scale-105">
        <Avatar className="h-[70px] w-[70px] bg-purple-100">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${
              user?.firstname || "Username"
            }`}
          />
          <AvatarFallback>
            {user
              ? user.firstname?.slice(0, 2).toUpperCase()
              : "UN"}
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-2xl font-medium hidden lg:block group-hover:text-gray-700">
        {user?.username}
      </h1>
    </Link>
    
    
  </div>
);

// Wallet Card Component
const WalletCard = ({balance, notDeliveredOrders, completedOrders}: {balance:  number, notDeliveredOrders: number, completedOrders: number}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
 
  const handleWithdraw = () => {
    setIsOpen(false);
    setWithdrawAmount('');
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mt-6 lg:mt-0"></h2>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mt-2 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 transform translate-x-32 -translate-y-32">
          <div className="absolute inset-0 bg-[#F9CA44] opacity-10 transform rotate-45 scale-150" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-[#F9CA44] bg-opacity-20 rounded-full">
              <Wallet className="w-8 h-8 text-[#F9CA44]" />
            </div>
            <span className="text-lg font-medium text-gray-600">Available Balance</span>
          </div>
          
          <div className="text-4xl font-bold mb-6">NGN {new Intl.NumberFormat().format(balance)}</div>
          
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-2 bg-[#F9CA44] text-white px-6 py-3 rounded-lg hover:bg-[#e0b63c] transition-all duration-300">
                <ArrowDownCircle className="h-5 w-5" />
                Withdraw Funds
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Withdraw Funds</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount to withdraw
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="Enter amount"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleWithdraw}
                  className="bg-[#F9CA44] hover:bg-[#e0b63c]"
                >
                  Confirm Withdrawal
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-4 py-6 px-1">
        <span className="block font-semibold">
        Completed Deliveries: <span className="font-normal">{completedOrders}</span>
        </span>
          <span className="block font-semibold">
          Pending Deliveries: <span className="font-normal">{notDeliveredOrders}</span>
        </span>
      </div>
    </div>
  );
};

const ReceiptModal = ({
  order,
  isOpen,
  onClose,
}: {
  order: IOrder | null;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AlertDialog open={isOpen} onOpenChange={onClose}>
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
                    {getDate(new Date(order.updatedAt))}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`capitalize px-2 py-1 rounded-full text-sm font-medium ${
                      order.status === "delivered"
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
                    className={`capitalize font-medium ${
                      order.paymentStatus === "paid"
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
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-right">
                      {order.receiversAddress}
                    </span>
                  </div>
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
          <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors">
            Checkout Order
          </button>
        )}

        {/* Close Button */}
        <AlertDialogCancel className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          Close
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);


// Transaction Item Component
const TransactionItem = ({ order, onClick }: { order: IOrder, 
  onClick: () => void
 }) => {

  return (
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-6 mt-2 cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
          <Package className="w-7 h-7 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="font-bold">#{order.orderId}</p>
        </div>
      </div>
      <span
        className={`capitalize font-medium px-3 py-1 rounded-full text-sm ${
          order.status === "delivered"
            ? "bg-green-50 text-green-600"
            : "bg-yellow-50 text-yellow-600"
        }`}
      >
        
        ₦ {new Intl.NumberFormat().format(parseInt(order.cost))}
      </span>
    </div>
  </div>
  )
};

// Main Component
const WalletDashboard = () => {
   const {user, accessToken} = useAuth();
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [orders, setOrders] = useState<IOrder[] | null>(null)
   const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
      const [latestOrder, setLatestOrder] = useState<IOrder | null>(null);
      const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [completedOrders, setCompletedOrders] = useState(0);
      const [notDeliveredOrders, setNotDeliveredOrders] = useState(0);

      const page = useRef(1);
      const limit = useRef(10);

        const handleOrderClick = (order: IOrder) => {
          setSelectedOrder(order);
          setIsModalOpen(true);
      };

    
      useEffect(() => {
          const fetchOrders = async () => {
            if (!hasMore) return;
      
            try {
              const response = await fetch(
                `/api/wallets?page=${page.current}&limit=${limit.current}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
      
              const data = await response.json();
      
              if (response.ok) {
                setWallet(data.wallet)
                setOrders(data.orders.docs)
                setLatestOrder(data.orders.docs[0]);
                setHasMore(data.orders.hasMore);
                setCompletedOrders(data.completedOrders);
                setNotDeliveredOrders(data.notDeliveredOrders)
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


  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader user={user} />
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-14">
          <WalletCard balance = {wallet?.balance || 0} completedOrders= {completedOrders} notDeliveredOrders=  {notDeliveredOrders}/>
          
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link href="#" className="text-gray-500 hover:text-gray-700 hover:underline transition-colors">
                See All
              </Link>
            </div>
            
            <div className="space-y-3">
              {orders?.map((order: IOrder) => (
                <TransactionItem key={order._id} order={order} onClick={() => handleOrderClick(order)}/>
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

export default WalletDashboard;