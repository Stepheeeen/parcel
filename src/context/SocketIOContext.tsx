"use client";
import React, {createContext, ReactNode} from "react"
import { io, Socket } from "socket.io-client";
import { DEV_ORIGIN } from "../../constants";
import { useAuth } from "./AuthContext";

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

const token = localStorage.getItem("user_data");

let accessToken = "";

if(token){
    accessToken = JSON.parse(token).accessToken;
}

const socket = io(`13.40.31.183:8081?token=${accessToken}`);

socket.on("active-users", (data) => {
    console.log("active users: ", data);
})

export const SocketProvider = ({children}: SocketProviderProps) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
} 