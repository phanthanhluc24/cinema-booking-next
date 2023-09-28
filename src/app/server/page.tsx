"use client"
import { IP_URL } from '@/config'
import React, { useEffect ,useState} from 'react'

export default function IdentifyUser({token}:any) {
    interface User{
        _id:string,
        name:string,
        email:string
    }
    const [localUser, setLocalUser]=useState<User>({_id:"",name:"",email:""})
    if (token) {
        const header={
            Authorization:`Bearer ${token.value}`
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
                console.log(error);
                
            })
        },[])
    }
  return (
    <>
    <div className="rounded-2xl text-white border p-1 hover:cursor-pointer">{localUser.name}</div>
    </>
  )
}
