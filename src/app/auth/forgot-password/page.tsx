"use client";
import { IP_URL } from "@/config";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
export default function ResetPassword() {
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  interface ForgetPassword{
    code:string,
    new_password:string,
    confirm_password:string
  }
  const cookie=new Cookies()
  const [password,setPassword]=useState<ForgetPassword>({code:'',new_password:"",confirm_password:""})
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setEmail(data);
  };

  const handlePasswordInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const data={...password,[e.target.name]:e.target.value}
    setPassword(data)
  }

  const changePassword={
    email:email,
    code:password.code,
    new_password:password.new_password,
    confirm_password:password.confirm_password
  }

  const handleSubmitForm=()=>{
    if (status==false) {
        fetch(IP_URL+"auth/user/auth-user-email",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email})
        })
        .then((res)=>res.json())
        .then((data)=>{
            if (data.status==201) {
                setStatus(true)
            }else{
                toast("Email not found or wrong",{hideProgressBar:false,autoClose:3000,type:"error"})
            }
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }else{
        // fetch("",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify(changePassword)
        // })
        // .then((res)=>res.json())
        // .then((data)=>{
        //    if (data.status==201) {
        //         toast("Recover password success!",{hideProgressBar:false,autoClose:3000,type:"success"})
        //    }
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }
  }

  return (
    <div className="mx-auto bg-gray-900 min-h-screen">
      <div className="flex mx-auto w-2/3 justify-center items-center pt-32 ">
        <Form className="w-80 bg-slate-300 rounded" onFinish={handleSubmitForm}>
          <div className="p-5">
            {status == false ? (
              <>
                <Form.Item
                  name={"email"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="px-3 py-2 outline-none"
                    onChange={handleEmailInput}
                  ></Input>
                </Form.Item>
                <Form.Item className="flex justify-center items-center space-x-4">
                  <Button
                    htmlType="submit"
                    className="px-3 py-1 border-green-500"
                  >
                    Confirm
                  </Button>
                  <Button
                    htmlType="button"
                    className="px-3 py-1 border-red-500 ml-4"
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name={"code"}
                  rules={[
                    {
                      required: true,
                      min: 6,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    name="code"
                    placeholder="Enter code from your email"
                    className="px-3 py-2 outline-none"
                    onChange={handlePasswordInput}
                  ></Input>
                </Form.Item>
                <Form.Item
                  name={"new_password"}
                  rules={[
                    {
                      required: true,
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password
                    name="new_password"
                    placeholder="Enter your new password"
                    className="px-3 py-2 outline-none"
                    onChange={handlePasswordInput}
                  ></Input.Password>
                </Form.Item>
                <Form.Item
                  name={"confirm_password"}
                  rules={[
                    {
                      required: true,
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password
                    name="confirm_password"
                    placeholder="Enter confirm password"
                    className="px-3 py-2 outline-none"
                    onChange={handlePasswordInput}
                  ></Input.Password>
                </Form.Item>
                <Form.Item className="flex justify-center items-center space-x-4">
                  <Button
                    htmlType="submit"
                    className="px-3 py-1 border-green-500"
                  >
                    Reset Password
                  </Button>
                  <Button
                    htmlType="button"
                    className="px-3 py-1 border-red-500 ml-4"
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
