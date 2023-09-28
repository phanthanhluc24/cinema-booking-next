"use client"
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import {Rate} from "antd"
import Cookies from "universal-cookie";
import { IP_URL } from "@/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Comment({params}:any) {
    const route=useRouter() 
    const id=params.id
    const cookie=new Cookies()
    const token=cookie.get("token")
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
    const [star,setStar]=useState(0)
    const [comment,setComment]=useState("")
    const handleTextArea=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const value=e.target.value
        setComment(value)
    }
    const handleComment=()=>{
      const data={
        comment:comment,
        star:star
      }
      if (token) {
        const headers={
          Authorization: ` Bearer ${token}`
        }
        fetch(IP_URL+`comment/movie/${id}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            ...headers
          },
          body:JSON.stringify(data)
        }) 
        .then((res)=>res.json())
        .then((data)=>{
          if (data.status==201) {
            toast("Comment successfully!",{hideProgressBar:false,autoClose:3000,type:"success"})
            route.back();
          }
        })
        .catch((error)=>{
          console.log(error);
          
        })
      }else{
        toast("Please login before comment",{hideProgressBar:false,autoClose:3000,type:"warning"})

      }
    }

  return (
    <div className="mx-auto min-h-screen bg-gray-900">
      <div className="mx-auto w-2/3">
        <div className="flex flex-col justify-center items-center pt-20">
            <h3 className="text-white text-2xl">Welcome to comment the movie</h3>
           <Form onFinish={handleComment}>
                <div className="mb-4">
                <label className="text-white text-xl">Your comment</label>
                <Form.Item>
                    <Input.TextArea cols={10} rows={5} className="w-96 rounded" onChange={handleTextArea}>
                    </Input.TextArea>
                </Form.Item>
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="text-white text-xl">Give star for this video</label>
                    <div className="bg-gray-600 rounded">
                        <Rate tooltips={desc} onChange={setStar} value={star} className="p-5"></Rate>
                        {star ? <span className="ant-rate-text text-white">{desc[star-1]}</span>:""}
                    </div>
                </div>
                <div className="flex justify-center items-center">
                <Button htmlType="submit" className="w-44 h-12 text-white font-bold bg-gray-500">Comment</Button>
                </div>
           </Form>
        </div>

      </div>
    </div>
  );
}
