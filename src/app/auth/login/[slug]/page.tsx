"use client";
import { Form, Input, Button, FormInstance } from "antd";
import React, { useState, useRef } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import { IP_URL } from "@/config";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Header from "@/app/header";
export default function Login() {
  interface Login {
    email: "";
    password: "";
  }

  const param: any = useParams();
  const url = decodeURIComponent(param.slug);
  const router = useRouter();
  const cookie = new Cookies();
  const formRef = useRef<FormInstance | null>(null);

  const [login, setLogin] = useState<Login>({ email: "", password: "" });
  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...login, [e.target.name]: e.target.value };
    setLogin(data);
  };
  const [error, setError] = useState("");
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
        if (data.status === 401) {
          setError(data.error);
        } else {
          cookie.set("token", data.token, { maxAge: 3600, path: "/" });
          toast("Login successfully", {
            hideProgressBar: false,
            autoClose: 3000,
            type: "success",
          });
          console.log(data);
          if (data.role == "ADM") {
            router.push("/movies/all-movie");
          } else {
            if (url === "user-login") {
              router.push("/");
              router.refresh();
            } else {
              router.push("/comment/" + url);
            }
          }
        }
        if (formRef.current) {
          formRef.current.resetFields();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>

            <Form
              ref={formRef}
              onFinish={handleFormSubmit}
              action=""
              className="flex flex-col gap-4"
            >
              <span className="text-red-500">{error}</span>
              <div className="">
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
              <div className="">
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
              <Button
                htmlType="submit"
                className="bg-[#002D74] rounded-xl text-white  hover:scale-105 duration-300"
              >
                Login
              </Button>
            </Form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400"></hr>
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400"></hr>
            </div>

            <Button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </Button>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <Link  href={"/auth/forgot-password"}>Forgot your password</Link>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <Button className="px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                <Link
                  className="hover:text-blue-400 text-blue-600  "
                  href={"/auth/register"}
                >
                  Register
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="h-auto max-w-full"
              src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/3/24/1026834/275629496_1216470904.jpg"
              alt="image description"
            />
          </div>
        </div>
      </div>
    </>
  );
}
