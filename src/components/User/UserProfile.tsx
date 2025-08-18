"use client";

import { ArrowLeft, Camera, EyeOff, Eye } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Loader } from "../ui/custom/loader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(!user);
  }, [user]);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (e: any) {
      toast({
        title: "Logout Failed",
        description: e?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">User Profile</h1>
        <div className="w-6" /> {/* spacer for alignment */}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center relative">
          <Avatar className="h-24 w-24 bg-purple-100">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.username || user?.firstname || "Username"
                }`}
              alt="User Avatar"
            />
            <AvatarFallback>
              {user?.username?.slice(0, 2).toUpperCase() || "UN"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
            <Camera className="h-4 w-4 text-gray-600" />
          </div>
        </div>

        {/* Profile Info */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-base font-medium text-gray-700">Profile Info</h2>
            <InputField
              label="Username"
              placeholder="Enter your username"
              disabled
              value={
                user?.username || `${user?.firstname} ${user?.lastname}` || "John Doe"
              }
              type="text"
            />
            <InputField
              placeholder="Enter your first name"
              label="Email"
              disabled
              value={user?.email || "parcel@gmail.com"}
              type="email"
            />

            <InputField
              placeholder="Enter your Phone number"
              label="Phone Number"
              disabled
              value={user?.phone || ""}
              type="text"
            />
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-gray-700">Security</h2>
              <Switch
                checked={showPasswordField}
                onCheckedChange={setShowPasswordField}
              />
            </div>
            {showPasswordField && (
              <InputField type="password" placeholder="New Password" />
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button label="Log Out" onClick={handleLogOut} />
          <Button label="Delete Account" variant="secondary" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;