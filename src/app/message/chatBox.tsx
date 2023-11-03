import { IP_URL } from "@/config";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
export default function ChatBox({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
}: any) {
  interface User {
    _id: string;
    full_name: string;
  }

  interface ChatMessage {
    senderId: string;
    text: string;
    createdAt: string;
  }
  const [userData, setUserData] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (chat && currentUser) {
      fetch(IP_URL + `message/${chat._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat && chat.members && currentUser) {
      const userId = chat.members.find((id: any) => id !== currentUser);
      fetch(IP_URL + `auth/user/list-user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [chat, currentUser]);

  const handleMessage = (newMessage: any) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
      if (chat && chat.members) {
      const userId = chat.members.find((id: any) => id !== currentUser);
      socket.emit("new-user-add",userId);
      socket.on("get-users", (users) => {
        setOnlineUser(users);
      });
    }
    }, [chat]);

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    //send message to socket server
    const receiveId = chat.members.find((id: any) => id !== currentUser);
    setSendMessage({ ...message, receiveId });

    try {
      fetch(IP_URL + "message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages((preMessage) => [...preMessage, data]);
          setNewMessage("");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages((preMessage) => [...preMessage, receiveMessage]);
    } 
  }, [receiveMessage]);

  return (
    <>
      {chat ? (
        <div>
          <div>
            {userData.map((item, index) => (
              <>
                <div
                  className="flex cursor-pointer pt-3 p-2 rounded"
                  key={index}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_QM81UhisEpFqbYx6Gx2ha_0KW70ye7nng&usqp=CAU"
                    alt=""
                    className="w-12 h-12 rounded-full bg-red-400"
                  />
                  <div className="pl-2 flex justify-center items-center">
                    <h4 className="font-bold">{item.full_name}</h4>
                  </div>
                </div>
                <hr className="mt-2" />
              </>
            ))}
          </div>
          {messages.map((messages, index) => (
            <div
              className={`flex p-2 ${
                messages.senderId == currentUser
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
              key={index}
            >
              <div
                className={` rounded-lg p-3 ${
                  messages.senderId === currentUser
                    ? "mr-2 bg-blue-200"
                    : "ml-2 bg-gray-200"
                }`}
              >
                <span>{messages.text}</span>
                <p className="flex justify-end text-xs pt-1">
                  {format(new Date(messages.createdAt))}
                </p>
              </div>
            </div>
          ))}
          <div className="bg-white flex justify-between h-14 items-center gap-4 p-3 rounded-2xl self-end">
            <div className="bg-gray-300 rounded-md flex items-center justify-center font-bold cursor-pointer h-7 p-5">
              +
            </div>
            <InputEmoji value={newMessage} onChange={handleMessage} />
            <div
              className="h-7 bg-orange-400 p-5 flex items-center justify-center font-bold cursor-pointer rounded-xl text-white"
              onClick={handleSend}
            >
              Send
            </div>
          </div>
        </div>
      ) : (
        <span>Tap start conversation</span>
      )}
    </>
  );
}
