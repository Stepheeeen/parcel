import React from "react";
import { Bell, Plus, Package, Circle } from "lucide-react";

const DeliveryTracking = () => {
  return (
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
            <h2 className="text-xl font-bold mt-6 lg:mt-0">Ongoing Delivery</h2>
            <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6">
              <div className="flex justify-between">
                <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md">
                  Transit
                </span>
                <span className="text-gray-500">Friday Aug 19, 2024</span>
              </div>
              <h3 className="text-2xl font-bold my-2 lg:text-3xl">E-F4RH996N</h3>
              <div className="flex justify-between mt-2 lg:mt-4">
                <div className="flex items-center space-x-1">
                  <Circle size={16} className="text-yellow-500" />
                  <span>Picked</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Circle size={16} className="text-yellow-500" />
                  <span>Delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Circle size={16} className="text-gray-400" />
                  <span>Delivered</span>
                </div>
              </div>
              <p className="text-gray-500 mt-2 lg:mt-4">
                Rider's Name: <strong>Peter Kwankwanso</strong>
              </p>
            </div>
          </div>

          {/* Recently Delivered Section */}
          <div>
            <div className="flex justify-between items-center mt-6 lg:mt-0">
              <h2 className="text-xl font-bold">Recently Delivered</h2>
              <a href="#" className="text-gray-500 hover:underline">
                See All
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 mt-2 lg:p-6 space-y-4">
              {[
                { id: "F-G5SI007O", status: "Completed", color: "text-green-500" },
                { id: "F-G5SI007O", status: "Cancelled", color: "text-red-500" },
                { id: "F-G5SI007O", status: "Completed", color: "text-green-500" },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID Number</p>
                      <p className="font-bold">{item.id}</p>
                    </div>
                  </div>
                  <span className={`${item.color} font-medium`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;