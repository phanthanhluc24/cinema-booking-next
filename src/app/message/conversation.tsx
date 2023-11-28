import { IP_URL } from "@/config";
import React, { useEffect, useState } from "react";

export default function Conversation({ currentUser, data }: any) {
  interface User {
    _id: string;
    full_name: string;
  }
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
    const userId = data.members.find((id: any) => id !== currentUser);
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
  }, []);

  return (
    <div>
      {userData.map((item, index) => (
        <div key={index}>
          <div className="flex cursor-pointer pt-3 hover:bg-slate-300 p-2 rounded" >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_QM81UhisEpFqbYx6Gx2ha_0KW70ye7nng&usqp=CAU"
              alt=""
              className="w-12 h-12 rounded-full bg-red-400"
            />
            <div className="blog pl-2">
              <h4 className="font-bold">{item.full_name}</h4>
              <p>You: I love you so much ....</p>
            </div>
          </div>
          <hr className="mt-2"/>
        </div>
      ))}
    </div>
  );
}
