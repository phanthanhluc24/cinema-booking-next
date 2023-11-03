"use client"
import { IP_URL } from '@/config'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Conversation from './conversation'
import ChatBox from './chatBox'
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export default function Message() {
    const cookie=new Cookies()
    const token=cookie.get("token")
    
    interface User{
        _id:string,
    }
    const [localUser, setLocalUser]=useState<User>({_id:""})
    const [chats,setChats]=useState([])
    const [currentChat,setCurrentChat]=useState([])
    const [sendMessage,setSendMessage]=useState(null)
    const [receiveMessage,setReceiveMessage]=useState(null)

    
    if (token) {
        const header={
            Authorization:`Bearer ${token}`
        }
        useEffect(()=>{
            fetch(IP_URL+"auth/user/current-user",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    ...header
                },
            })
            .then((res)=>res.json())
            .then((data)=>{
                setLocalUser(data)
            })
            .catch((error)=>{
                console.log(error)
            })
        },[token])
        
        useEffect(()=>{
            fetch(IP_URL+`chat/${localUser._id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
              setChats(data)
            })
            .catch((error)=>{
                console.log(error);
                
            })
        },[localUser._id])
    }

    //send message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        socket.emit("send-message",sendMessage)
      }
    },[sendMessage])

    
    // receive message from socket server
    useEffect(()=>{
      console.log("Where are you!");
      socket.on("receive-message",(data)=>{
        console.log("Receive data "+data);
        try {
          setReceiveMessage(data)
        } catch (error) {
          console.log(error);
        }
      })
      // return () => {
      //   socket.off("received_message");
      // };
    },[])

  return (
    <>
    <div className="pt-14 mx-auto bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className=" col-span-1 bg-white min-h-[814px] border-r-2">
          <div className="text-center pt-10">
            <p className="text-xl font-bold">Message</p>
          </div>
         <div className="block pl-5 pt-5">
          {chats.map((chat,index)=>(
            <div key={index} onClick={()=>setCurrentChat(chat)}>
              <Conversation currentUser={localUser._id} data={chat} />  
            </div>
          ))}
          </div> 
        </div>
        <div className="col-span-3 bg-white min-h-[814px] border-r-2">
            <div className="pt-10">
              <ChatBox chat={currentChat} currentUser={localUser._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
            </div>
        </div>
        <div className=" col-span-1 bg-white min-h-[814px]"></div>
      </div>
    </div>
  </>
  )
}
