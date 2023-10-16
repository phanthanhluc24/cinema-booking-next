"use client"
import Navbar from "@/app/movies/navbar";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { IP_URL } from "@/config";
import Link from "next/link";
export default function AllCinema() {
    interface Cinemas{
        cinema_name:string,
        image:string,
        phone:string,
        address:string,
        capacity:string
    }

  const [cinema,setCinema]=useState<Cinemas[]>([])

  useEffect(()=>{
    fetch(IP_URL+"cinema/all-cinemas",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        setCinema(data)
        console.log(data);
    })
    .catch((error)=>{
        console.log(error);
    })
  })

  const url_Image=(url:string)=>{
    return `${url}`
  }
  const columns = [
    {
        title:"Cinema name",
        dataIndex:"cinema_name",
        key:"cinema_name"
    },
    {
        title:"Avatar",
        dataIndex:"image",
        key:"image",
        render:(image:string)=>{
            return (
              <img src={url_Image(image)} alt="" className="w-10 h-10 rounded-xl hover:cursor-zoom-in"/>
            ) 
          }
    },
    {
        title:"Phone",
        dataIndex:"phone",
        key:"phone"
    },
    {
        title:"Address",
        dataIndex:"address",
        key:"address"
    },
    {
        title:"Capacity",
        dataIndex:"capacity",
        key:"capacity",
    },{
      title:"Action",
      dataIndex:"_id",
      key:"_id",
      render:(_id:string)=>{
        return <span>
          <Button
          danger
          >Delete</Button>
          <Link href={`/cinemas/edit/${_id}`}  className="ml-2 px-3 py-1 rounded border border-green-600 text-green-600">Edit</Link>
        </span>
      }
    }
];
  return (
    <div>
      <div className="mx-auto flex h-screen pt-14">
        <div className="w-1/4 bg-gray-700 mr-5">
          <Navbar />
        </div>
        <div className="w-3/4">
          <Table dataSource={cinema} columns={columns}></Table>
        </div>
      </div>
    </div>
  );
}
