"use client";

import React, { useState } from "react";
import { Wallet, ArrowDownCircle, Plus } from "lucide-react";
import Link from "next/link";
import { IUser, useAuth } from "@/context/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Types
interface ITransaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  date: string;
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
const WalletCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    setIsOpen(false);
    setWithdrawAmount('');
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mt-6 lg:mt-0">Wallet Balance</h2>
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
          
          <div className="text-4xl font-bold mb-6">$1,250.00</div>
          
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
    </div>
  );
};

// Transaction Item Component
const TransactionItem = ({ transaction }: { transaction: ITransaction }) => (
  <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-6 mt-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
          <Wallet className="w-7 h-7 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="font-bold">#{transaction.id}</p>
        </div>
      </div>
      <span
        className={`capitalize font-medium px-3 py-1 rounded-full text-sm ${
          transaction.status === "completed"
            ? "bg-green-50 text-green-600"
            : "bg-yellow-50 text-yellow-600"
        }`}
      >
        ₦{transaction.amount}
      </span>
    </div>
  </div>
);

// Main Component
const WalletDashboard = () => {
  const { user } = useAuth();
  const transactions: ITransaction[] = [
    { id: "TR001", type: "withdrawal", amount: 150, status: "completed", date: "2024-12-28" },
    { id: "TR002", type: "deposit", amount: 300, status: "pending", date: "2024-12-27" },
    { id: "TR003", type: "withdrawal", amount: 200, status: "completed", date: "2024-12-26" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader user={user} />
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-14">
          <WalletCard />
          
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recent Transactions</h2>
              <Link href="#" className="text-gray-500 hover:text-gray-700 hover:underline transition-colors">
                See All
              </Link>
            </div>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;