"use client";
import { Form, Input, Button, FormInstance } from "antd";
import React, { useState, useRef } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import { IP_URL } from "@/config";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Login() {
  interface Login {
    email: "";
    password: "";
  }

  const param:any=useParams()
  const url = decodeURIComponent(param.slug);
  const router = useRouter();
  const cookie = new Cookies();
  const formRef = useRef<FormInstance | null>(null);

  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...login, [e.target.name]: e.target.value };
    setLogin(data);
  };
  const expireDay = new Date();
  expireDay.setHours(expireDay.getHours() + 1);
  const handleFormSubmit = () => {
    fetch(IP_URL + "auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((data) => {
        cookie.set("token", data.token, { maxAge: 3600, path: "/" });
        toast("Login successfully", {
          hideProgressBar: false,
          autoClose: 3000,
          type: "success",
        });
        console.log(data);
        
        if (formRef.current) {
          formRef.current.resetFields();
        }
        if (data.role=="ADM") {
          router.push("/movies/all-movie")
        }else{
          if (url==="user-login") {
            router.push("/");
          }else{
            router.push("/comment/"+url);
          }
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mx-auto  bg-gray-900 min-h-screen">
        <div className="mx-auto w-2/3 flex justify-center">
          <Form
            ref={formRef}
            onFinish={handleFormSubmit}
            className="shadow-xl rounded-lg bg-gray-300 mt-32 w-96"
          >
            <div className="p-5">
              <div className="mb-4">
                <label
                  htmlFor=""
                  className="block text-gray-600 font-bold text-xl"
                >
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Field email is required",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    onChange={handleInputForm}
                    name="email"
                    placeholder="Enter your email address"
                    className="text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none"
                  ></Input>
                </Form.Item>
              </div>
              <div className="mb-4">
                <label
                  htmlFor=""
                  className="block text-gray-600 font-bold text-xl"
                >
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Field password is required",
                    },
                    {
                      min: 8,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    onChange={handleInputForm}
                    name="password"
                    placeholder="Enter your password"
                    className="text-gray-500 outline-none shadow px-3 py-2 focus:outline-none focus:border-none"
                  ></Input.Password>
                </Form.Item>
              </div>
              <Link href={"/auth/forgot-password"}>Forgot password</Link>
              <div className="mb-4 flex-col justify-center items-center gap-4 text-center">
                <Button
                  htmlType="submit"
                  className="px-3 py-1 rounded text-white font-bold hover:text-white bg-green-700 w-64"
                >
                  Login
                </Button>
              </div>
              <div className="flex justify-center align-center">
                <span>
                  Don't have an account?{" "}
                  <Link className="hover:text-blue-600" href={"/auth/register"}>
                    Create account
                  </Link>
                </span>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
