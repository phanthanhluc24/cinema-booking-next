"use client"
import Navbar from '@/app/movies/navbar'
import { IP_URL } from '@/config'
import { Button, Form, Input,FormInstance } from 'antd'
import React, { useState,useRef } from 'react'

export default function Create() {
  const formRef=useRef<FormInstance | null>(null)

    interface Cinema{
    cinema_name:{type:String,required:true}
    address:{type:String,required:true},
    phone:{type:String,required:true},
    show_times:{type:String,required:true},
    ticket_price:{type:String,required:true},
    service:{type:String,required:true},
    capacity:{type:String,required:true},
    map:{type:String,required:true},
    image:{type:String,required:true}
    }

    const [cinema,setCinema]=useState<Cinema[]>([])

    const handleInputForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const data={...cinema,[e.target.name]:e.target.value}
        setCinema(data)
    }

    const handleSubmitForm=()=>{
        // console.log(cinema);
        
        fetch(IP_URL+"cinema/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cinema)
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if (formRef.current) {
                formRef.current.resetFields();
              }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div>
      <div className="mx-auto h-screen flex">
        <div className="w-1/4 bg-slate-700 mr-5">
            <Navbar/>
        </div>
        <div className="w-3/4 mt-24">
            <div className="mx-auto w-3/3">
                <Form onFinish={handleSubmitForm} ref={formRef}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Cinema name</label>
                                <Form.Item
                                name="cinema_name"
                                rules={[{
                                    required:true,message:"Field name is required"
                                }]}
                                >
                                <Input  name="cinema_name" onChange={handleInputForm} className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none" placeholder='Enter the name cinema'></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Address</label>
                                <Form.Item
                                name="address"
                                rules={[{
                                    required:true,message:"Field address is required"
                                }]}
                                >
                                <Input name="address" onChange={handleInputForm}  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none" placeholder='Enter the address of the cinema'></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Phone</label>
                                <Form.Item
                                name="phone"
                                rules={[{
                                    required:true,message:"Field phone is required"
                                }]}
                                >
                                <Input  name="phone" onChange={handleInputForm} className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none" placeholder='Enter number phone'></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Show time</label>
                                <Form.Item
                                name="show_times"
                                rules={[{
                                    required:true,message:"Field show time is required"
                                }]}
                                >
                                <Input  name="show_times" onChange={handleInputForm} placeholder='Enter time show movie'  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-span-1">
                        <div className="mb-4">
                            <label className='font-bold text-gray-500 block mb-2'>Ticket price</label>
                                <Form.Item
                                name="ticket_price"
                                rules={[{
                                    required:true,message:"Field price is required"
                                }]}
                                >
                                <Input name="ticket_price" onChange={handleInputForm} placeholder='Enter price '  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Service</label>
                                <Form.Item
                                name="service"
                                rules={[{
                                    required:true,message:"Field service is required"
                                }]}
                                >
                                <Input onChange={handleInputForm} name="service" placeholder='Enter service free' className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Capacity</label>
                                <Form.Item
                                name="capacity"
                                rules={[{
                                    required:true,message:"Field capacity is required"
                                }]}
                                >
                                <Input onChange={handleInputForm} name="capacity" placeholder='Enter number capacity'  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Map</label>
                                <Form.Item
                                name="map"
                                rules={[{
                                    required:true,message:"Field map is required"
                                }]}
                                >
                                <Input name="map" onChange={handleInputForm} placeholder='Enter link map of cinema'  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                            <div className="mb-4">
                                <label className='font-bold text-gray-500 block mb-2'>Image</label>
                                <Form.Item
                                name="image"
                                rules={[{
                                    required:true,message:"Field image is required"
                                }]}
                                >
                                <Input name="image" onChange={handleInputForm} placeholder='Enter link image of cinema'  className="rounded shadow px-3 py-2 outline-none border-none focus:outline-none focus:shadow-none"></Input>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Button htmlType='submit' className='bg-green-500'>Create</Button>
                    </div>
                </Form>
            </div>
        </div>
      </div>
    </div>
  )
}
