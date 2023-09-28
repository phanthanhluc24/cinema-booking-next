"use client"

import { IP_URL } from "@/config"
import { useState } from "react"
import {useRouter} from "next/navigation"
import {toast} from "react-toastify"
export default function SearchForm() {
 const [search,setSearch]=useState("")
  const handleInputForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const value=e.target.value
      setSearch(value)
  }
  const router=useRouter()
  const handleSubmit=(e:React.FormEvent)=>{
      e.preventDefault()
      if (!search) {
        toast("Please enter your data to research",{hideProgressBar:false,autoClose:3000,type:"warning"})
      }else{
        router.push(`/search/${search}`)
      }
  }
  
  return (
    <form action="" method="post" onSubmit={handleSubmit}>
    <input
      type="text"
      className="rounded border-emerald-400 border outline-none pl-2 text-search"
      name="search"
      value={search}
      placeholder="Search movie..."
      onChange={handleInputForm}
    />
    <button type="submit" className="fa-solid fa-magnifying-glass right-3 absolute top-1/2 transform -translate-y-1/2 text-sm hover:cursor-pointer"></button>
    </form>
  )
}
