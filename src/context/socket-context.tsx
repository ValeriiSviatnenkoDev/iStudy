import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhos:5000');

export const SocketContext = createContext({ });

export const SocketProvider = (props:React.PropsWithChildren<{  }>) => {

    useEffect(() => {
       
    }, []);

    const answerCall = () => {
        
    }

    const callUser = () => {
        
    }

    const leaveCall = () => {
        
    }
}