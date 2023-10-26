"use client"
import React, { useEffect, useState } from "react";
import Movies from "./movies/movies";
import { Carousel } from "antd";
import { IP_URL } from "@/config";

export function Poster() {

  interface ImageRandom{
    image:string
  }
  const [randomMovie,setRandomMovie]=useState<ImageRandom[]>([])
  useEffect(()=>{
    fetch(IP_URL+"admin/movie-random",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setRandomMovie(data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <div className="pt-14">
      <Carousel autoplay>
        {randomMovie.map((data,index)=>(
          <div>
            <img
              src={`${data.image}`}
              alt=""
              className="w-screen h-[750px]"
            />
          </div>
        ))}
      </Carousel>
      <Movies />
      {/* <Chat/> */}
    </div>
  );
}
