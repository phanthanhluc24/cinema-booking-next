"use client"
import Navbar from '@/app/movies/navbar'
import { IP_URL } from '@/config'
import { Button, Form, Input,FormInstance } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState,useRef, useEffect } from 'react'
import {toast} from "react-toastify"
export default function Edit({params}:any) {

    const router=useRouter()
    const _id=params.id;

    interface Cinema{
    cinema_name:string
    address:string,
    phone:string,
    show_times:string,
    ticket_price:string,
    service:string,
    capacity:string,
    map:string,
    image:string
    }

    const [cinema,setCinema]=useState<Cinema>({
        cinema_name:"",
        address:"",
        phone:"",
        show_times:"",
        ticket_price:"",
        service:"",
        capacity:"",
        map:"",
        image:""})

    const handleInputForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const data={...cinema,[e.target.name]:e.target.value}
        setCinema(data)
    }

    useEffect(()=>{
        fetch(IP_URL+`cinema/edit-cinema/${_id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setCinema(data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[_id])

    const handleSubmitForm=()=>{ 
        fetch(IP_URL+`cinema/update-cinema/${_id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cinema)
        }).then((res)=>res.json())
        .then((data)=>{
            if (data.status=201) {
                toast("Update successfully",{hideProgressBar:false,autoClose:3000,type:"success"})
                router.back()
            }
        })
        .catch((error)=>{
            toast("Update fail",{hideProgressBar:false,autoClose:3000,type:"warning"})
        })
    }

  return (
    <>
      <div className="mx-auto h-screen flex pt-14">
        <div className="w-1/4 bg-slate-700 mr-5">
            <Navbar/>
        </div>
        <div className="w-3/4 mt-24">
            <div className="mx-auto w-3/3">
                <form onSubmit={handleSubmitForm} method='post'>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Cinema name</label>
                                <input onChange={handleInputForm} placeholder='Cinema name' type="text" value={cinema.cinema_name} name='cinema_name' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Address</label>
                               <input onChange={handleInputForm} type="text" placeholder='Address' value={cinema.address} name='address' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Phone</label>
                               <input  onChange={handleInputForm}type="text" placeholder='Phone' value={cinema.phone} name='phone' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Show time</label>
                                <input onChange={handleInputForm} placeholder='Show time' type="text" value={cinema.show_times} name='show_times' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                        </div>
                        <div className="col-span-1">
                        <div className="mb-4">
                            <label className='font-bold text-gray-500 block mb-2'>Ticket price</label>
                                <input onChange={handleInputForm} placeholder='Ticket price' type="text" value={cinema.ticket_price} name='ticket_price' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Service</label>
                                <input onChange={handleInputForm} type="text" placeholder='Service' value={cinema.service} name='service' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Capacity</label>
                               <input onChange={handleInputForm} type="text" placeholder='Capacity' value={cinema.capacity} name='capacity' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Map</label>
                                <input  onChange={handleInputForm}type="text" placeholder='Map' value={cinema.map} name='map' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Image</label>
                                <input  onChange={handleInputForm}type="text" placeholder='Image' value={cinema.image} name='image' required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <button type='submit'className="uppercase text-white bg-green-500 rounded py-2 px-3">Create</button>
                        <button onClick={()=>router.back()} type='button' className="uppercase text-white bg-gray-500 rounded py-2 px-3">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}
