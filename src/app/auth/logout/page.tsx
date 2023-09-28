"use client"

import { IP_URL } from "@/config"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Cookies from "universal-cookie"
export default function Logout() {
    const cookie=new Cookies()
    const token=cookie.get("token")
    const router=useRouter()
    // const headers={
    //     Authorization:`Bearer ${token}`
    // }

    if (!token) {
        toast("You not yet login!",{hideProgressBar:false,autoClose:3000,type:"error"})
        router.push("/")
    }else{
        fetch(IP_URL+"auth/user/logout",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // ...headers
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if (data.status==201) {
            toast("Logout successfully",{hideProgressBar:false,autoClose:3000,type:"success"})
            cookie.remove("token",{maxAge:3600,path:"/"})
            router.push("/")
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
      
    </div>
  )
}
