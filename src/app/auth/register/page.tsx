"use client"
import { IP_URL } from '@/config'
import { Button, Form, FormInstance, Input } from 'antd'
import Link from 'next/link'
import React, { useState,useRef } from 'react'
import { useRouter } from 'next/navigation'
import {toast} from "react-toastify"
export default function Register() {
    interface Register{
        full_name:"",
        email:"",
        phone:"",
        password:""
    }

    const navigate=useRouter()

    const formRef=useRef<FormInstance|null>(null)
    const [register,setRegister]=useState<Register>({full_name:"",email:"",phone:"",password:""})
    const handleInputForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const data={...register,[e.target.name]:e.target.value}
        setRegister(data)
    }
    const handleFormSubmit=()=>{
        fetch(IP_URL+"auth/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(register)
        })
        .then((res)=>res.json())
        .then((data)=>{
            toast("Register account successfully",{hideProgressBar:false,autoClose:3000,type:"success"})
            if (formRef.current) {
                formRef.current.resetFields()
                navigate.push("/auth/login/user-login")
            }
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }
  return (
    <>
      <div className="mx-auto bg-gray-900 h-screen">
        <div className="mx-auto w-2/3 items-center flex justify-center">
        <Form ref={formRef} onFinish={handleFormSubmit} className='shadow-xl rounded-lg bg-gray-300 w-96 mt-32'>
            <div className="p-5">
            <div className="mb-4">
                <label htmlFor="" className='block text-gray-600 font-bold text-xl'>Full Name</label>
                <Form.Item
                name="full_name"
                rules={[{
                    required:true,
                    message:"Field full name is required"
                }]}
                hasFeedback
                >
                <Input  onChange={handleInputForm} name='full_name' placeholder='Enter your full name' className='text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none'></Input>
                </Form.Item>
            </div>
            <div className="mb-4">
                <label htmlFor="" className='block text-gray-600 font-bold text-xl'>Email</label>
                <Form.Item
                name="email"
                rules={[{
                    required:true,
                    message:"Field email is required"
                }]}
                hasFeedback
                >
                <Input onChange={handleInputForm} name='email' placeholder='Enter your email address' className='text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none'></Input>
                </Form.Item>
            </div>
            <div className="mb-4">
                <label htmlFor="" className='block text-gray-600 font-bold text-xl'>Phone</label>
                <Form.Item
                name="phone"
                rules={[{
                    required:true,
                    message:"Field phone is required"
                },{
                    max:10,
                },{
                    min:10
                }]}
                hasFeedback
                >
                <Input onChange={handleInputForm} name='phone' placeholder='Enter your number phone' className='text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none'></Input>
                </Form.Item>
            </div>
            <div className="mb-4">
                <label htmlFor="" className='block text-gray-600 font-bold text-xl'>Password</label>
                <Form.Item
                name="password"
                rules={[{
                    required:true,
                    message:"Field password is required"
                },{
                    min:8
                }]}
                hasFeedback
                >
                <Input.Password  onChange={handleInputForm} name='password' placeholder='Enter your password' className='text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none'></Input.Password>
                </Form.Item>
            </div>
            <div className="mb-4 flex justify-center items-center gap-4 text-center">
                <Button htmlType='submit' className='px-3 py-1 rounded text-white font-bold hover:text-white bg-green-700'>Register</Button>
                <Link className='hover:text-blue-600' href={"/auth/login"}>Already has account</Link>
            </div>
            </div>
        </Form>
        </div>
      </div>
    </>
  )
}
