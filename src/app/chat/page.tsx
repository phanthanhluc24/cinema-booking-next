"use client";
import { useState, useEffect } from "react";
import socket from "./socket";

export default function SocketHandler() {
  interface Message{
    name:string,
    message:string,
    times:string,
    idUser:string
  }
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    socket.on("received_message", (data: Message) => {
      console.log("Received raw data:", data);
        try {
          setMessages((preMessage) => [
            ...preMessage,
            { name: data.name, message:data.message,times:data.times,idUser:data.idUser},
          ]);
          console.log("Received a message:", data.message);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    );
    return () => {
      socket.off("received_message");
    };
  }, []);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "" && room.trim()!=="") {
      const data={
        room:room,
        message:message,
        name:name,
        times:new Date( Date.now()).getHours()+ ":" +new Date( Date.now()).getMinutes()
      }
      socket.emit("chat message",data);
      // setMessages((preMessage) => [
      //   ...preMessage,
      //   { name: data.name, message:data.message,times:data.times},
      // ]);
      setMessage("");
    }
  };

  const handleJoinRoom=({id,name}:any)=>()=>{
    setName(name)
    setRoom(id)
    socket.emit("join_room",id)
  }

  return (
    <>
      <div className="pt-14 mx-auto bg-white min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className=" col-span-1 bg-white min-h-[814px] border-r-2">
            <div className="text-center pt-10">
              <p className="text-xl font-bold">Message</p>
            </div>
            <div className="block pl-5 pt-5">
              <div
                className="flex cursor-pointer"
                onClick={handleJoinRoom({id:"123",name:"Phan Thanh Lực"})}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNJ_ycNgyqWop49RANyNrx8OiOx8c-AER9g&usqp=CAU"
                  alt=""
                  className="w-12 h-12 rounded-full bg-red-400"
                />
                <div className="blog pl-2">
                  <h4 className="font-bold">Phan Thanh Lực</h4>
                  <p>You: I love you so much ....</p>
                </div>
              </div>
              <div
                className="flex cursor-pointer pt-3"
                onClick={handleJoinRoom({id:"456",name:"Nguyễn Văn Biên"})}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_QM81UhisEpFqbYx6Gx2ha_0KW70ye7nng&usqp=CAU"
                  alt=""
                  className="w-12 h-12 rounded-full bg-red-400"
                />
                <div className="blog pl-2">
                  <h4 className="font-bold">Nguyễn Văn Biên</h4>
                  <p>You: I love you so much ....</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white min-h-[814px] border-r-2">
              <div className="pt-10">
                {messages.map((item,index)=>(
                  <div key={index} className={`${item.idUser===socket.id? "right":"left"} block min-w-[100px] min-h-[50px]`}>
                    {/* <span>{item.name}</span> */}
                    <p>{item.message}</p>
                    <p>{item.times}</p>
                  </div>
                ))}
              </div>
            <div className="flex absolute bottom-5">
              <form action="" method="post" onSubmit={handleSubmit}>
                <textarea
                  className="w-[700px] px-2 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 "
                  placeholder="Enter your message"
                  onChange={handleMessage}
                  name="message"
                  value={message}
                ></textarea>
                <button type="submit" className="px-2 py-3 text-green-600 bg-yellow-500">Send</button>
              </form>
            </div>
          </div>
          <div className=" col-span-1 bg-white min-h-[814px]"></div>
        </div>
      </div>
    </>
  );
}
