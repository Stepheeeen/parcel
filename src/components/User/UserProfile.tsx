"use client";

import { ArrowLeft, PencilIcon, Camera } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import Link from "next/link";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center justify-between w-full gap-4">
          <Link href={"/user/home"}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-[500]">User Profile</h1>

          <div></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Avatar Section */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative">
            <Avatar className="h-24 w-24 bg-purple-100">
              <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=aurora" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Section */}
        <div className="space-y-6">
          <div className="space-y-7">
            <div className="px-2 md:px-4 space-y-7">
              <h2 className="text-xl font-[530] mb-2 flex items-center justify-between">
                Profile
                <a>
                  <PencilIcon className="h-4 w-4" />
                </a>
              </h2>
              {/* <CardContent className="p-4 space-y-4"> */}
              <div>
                {/* <label className="text-sm text-gray-500">Username</label> */}
                <InputField placeholder="Aurora" type="text" />
              </div>
              <div className="mb-9">
                {/* <label className="text-sm text-gray-500">Email</label> */}
                <InputField placeholder="aurora@gmail.com" type="email" />
              </div>

              {/* </CardContent> */}
            </div>
            {/* Security Section */}
            <div className="px-2 md:px-4">
              <h2 className="text-[16px] font-[400] mb-3">
                Security & Password
              </h2>
              <InputField type="password" placeholder="Change Password" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6 px-2 md:px-4">
            <Button label={"Logout"} />
            <Button label={"Delete Account"} variant={"secondary"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
