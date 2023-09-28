"use client";
import { IP_URL } from "@/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Detail({ params }: any) {
  interface movieDetail {
    title:string,
    image: string;
    description: string;
    rating: number;
    release_date: string;
    genre: string;
    country: string;
    duration: number;
  }

  const [detail, setDetail] = useState<movieDetail>();

  useEffect(() => {
    fetch(IP_URL + `admin/movie/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const dateRelease: any = detail?.release_date;
  const dayObject = new Date(dateRelease);
  const day = dayObject.getDate();
  const month = dayObject.getMonth() + 1;
  const year = dayObject.getFullYear();


  const [star,setStar]=useState("text-gray-800")
  const handleIconStar=()=>{
    setStar(star==="text-gray-800"? "text-yellow-500":"text-gray-800" )
  }

  const [heart,setHeart]=useState("text-gray-800")
  const handleIconHeart=()=>{
    setHeart(heart==="text-gray-800"? "text-yellow-500":"text-gray-800" )
  }

  const [eye,setEye]=useState("text-gray-800")
  const handleIconEye=()=>{
    setEye(eye==="text-gray-800"? "text-yellow-500":"text-gray-800" )

  }
  return (
    <>
    <img className="w-screen h-[600px] " src={detail?.image}alt="" />
    <div className="bg-slate-700 flex">
      <div className="w-1/4 pt-6 pl-12">
        <div className="block">
          <div className="flex flex-col justify-center items-center text-center">
            <img className="w-64 h-80 rounded-lg image-detail-movie object-cover" src={detail?.image} alt="" />
            <Link
              href={`/book/${params.id}`}
              className="text-xl text-white w-56 h-12 rounded-lg bg-yellow-600 mt-4 uppercase hover:cursor-pointer text-center flex justify-center items-center"
            >
              Book tickets
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-3">
            <div className="flex-col justify-center items-center text-center">
              <span className={`text-3xl ${star} hover:text-yellow-500 hover:cursor-pointer`} onClick={handleIconStar}>
                &#9733;
              </span>
              <p className="text-white">Favorite</p>
            </div>
            <div className="flex-col justify-center items-center text-center ">
              <span className={`text-3xl ${heart} hover:text-yellow-500 hover:cursor-pointer`} onClick={handleIconHeart}>
                &#x2764;
              </span>
              <p className="text-white">Watch late</p>
            </div>
            <div className="flex-col justify-center items-center text-center">
              <span className={`text-3xl ${eye} hover:text-yellow-500 hover:cursor-pointer`} onClick={handleIconEye}>
                &#128065;
              </span>
              <p className="text-white">Watched</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 mt-6">
        <div className="flex flex-col">
          <h4 className="text-white text-xl">{detail?.title}</h4>
          <h6 className="text-white mt-3 uppercase">Description</h6>
          <p className="w-[600px] text-white">{detail?.description}</p>
          <div className="flex w-52 mt-12">
            <div className="w-1/3 uppercase text-gray-600">
              <p>Rating</p>
              <p>Release</p>
              <p>Genres</p>
              <p>Countries</p>
              <p>Duration</p>
            </div>
            <div className="w-2/3 ml-8 text-white">
              <p>{detail?.rating}</p>
              <p>{day + "-" + month + "-" + year}</p>
              <p>{detail?.genre}</p>
              <p>{detail?.country}</p>
              <p>{detail?.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
