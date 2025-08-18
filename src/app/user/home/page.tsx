"use client"

import DeliveryTracking from '@/components/User/DeliveryTracking'
import { SocketContext } from '@/context/SocketIOContext'
import React, { useContext, useEffect, useState } from 'react'

interface INotification {
  rider?: string;
  user:string;
  title: string;
  order: any;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
}


const index = () => {
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  
  useEffect(() => {
    socket?.on("notification", (data: INotification) => {
      setNotifications((prev) => [...prev, data])
    })

    return () => {
      socket?.off("notification");
    };
  }), [socket];

  return (
    <div>
      <DeliveryTracking />
    </div>
  )
}

export default index
