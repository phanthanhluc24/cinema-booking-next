import { IP_URL } from '@/config';
import React,{useState,useEffect} from 'react'

export const ContactUser = ({setCurrentChat,currentUser}:any) => {
    interface User {
        _id: string;
        full_name: string;
      }
      console.warn(currentUser);
      
    const [contact,setContact]=useState<User[]>([])
        useEffect(()=>{
            fetch(IP_URL+`auth/user/all-user/${currentUser}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                setContact(data)
                console.log(data);
                
            })
            .catch((error)=>{
                console.log(error);
                
            })
        },[])  
    
  return (
    <div>
        {contact.map((item, index) => (
        <div key={index} onClick={()=>setCurrentChat(item)}>
          <div className="flex cursor-pointer pt-3 hover:bg-slate-300 p-2 rounded" >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_QM81UhisEpFqbYx6Gx2ha_0KW70ye7nng&usqp=CAU"
              alt=""
              className="w-12 h-12 rounded-full bg-red-400"
            />
            <div className="blog pl-2 items-center justify-center flex">
              <h4 className="font-bold">{item.full_name}</h4>
            </div>
          </div>
          <hr className="mt-2"/>
        </div>
      ))}
    </div>
  )
}
