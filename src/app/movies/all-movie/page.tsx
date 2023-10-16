"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { Button, Table } from "antd";
import { IP_URL } from "@/config";
import Link from "next/link"
export default function allMovies() {
  interface Movies {
    title: string;
    genre: string;
    language: string;
    country: string;
    image: string;
    _id: string;
  }
  const [movie, setMovie] = useState<Movies[]>([]);
  useEffect(() => {
    fetch(IP_URL + "admin/all-movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  const handleDelete=(_id:string)=>{
    console.log(_id);
    
  }
  const urlImage = (url: string) => {
    return `${url}`;
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Avatar",
      dataIndex: "image",
      key: "avatar",
      render: (image: string) => {
        return (
          <img src={urlImage(image)} alt="" className="w-10 h-10 rounded-xl" />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id:string) => {
      return  <span>
          <Button
            onClick={() => handleDelete(_id)}
            danger
          >
            Delete
          </Button>
          <Link href={`/movies/edit/${_id}`}
            className="ml-2 px-3 py-1 rounded border border-green-600 text-green-600"
          >
            Edit
          </Link>
        </span>;
      },
    },
  ];
  return (
    <div>
      <div className="mx-auto flex h-screen pt-14">
        <div className="w-1/4 bg-gray-700 mr-5">
          <Navbar />
        </div>
        <div className="w-3/4">
          <Table dataSource={movie} columns={columns}></Table>
        </div>
      </div>
    </div>
  );
}
