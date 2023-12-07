"use client";
import { IP_URL } from "@/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RelatedMovies from "./relatedMovies";
import CommentMovie from "./comment";
export default function Detail({ params }: any) {
  interface movieDetail {
    title: string;
    image: string;
    description: string;
    rating: number;
    release_date: string;
    genre: string;
    country: string;
    duration: number;
    _id: string;
  }

  const [detail, setDetail] = useState<movieDetail>();
  const [numberStar, setNumberStar] = useState(0);
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

  useEffect(() => {
    fetch(IP_URL + `admin/movie/star/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNumberStar(data);
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

  const [star, setStar] = useState("text-gray-800");
  const handleIconStar = () => {
    setStar(star === "text-gray-800" ? "text-yellow-500" : "text-gray-800");
  };

  const [heart, setHeart] = useState("text-gray-800");
  const handleIconHeart = () => {
    setHeart(heart === "text-gray-800" ? "text-yellow-500" : "text-gray-800");
  };

  const [eye, setEye] = useState("text-gray-800");
  const handleIconEye = () => {
    setEye(eye === "text-gray-800" ? "text-yellow-500" : "text-gray-800");
  };
  return (
    <>
      <img className="w-screen h-[600px] " src={detail?.image} alt="" />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex mx-8">
          <div className="w-3/5">
            <div className="flex">
              <div className="w-2/4 pt-6 ">
                <div className="block">
                  <div className="flex flex-col justify-center items-center text-center">
                    <img
                      className="w-64 h-80 rounded-lg image-detail-movie object-cover"
                      src={detail?.image}
                      alt=""
                    />
                    <Link
                      href={`/book/${params.id}`}
                      className="text-xl text-white w-56 h-12 rounded-lg bg-slate-700 mt-4 uppercase hover:cursor-pointer text-center flex justify-center items-center"
                    >
                      Book tickets
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-2/4 mt-6">
                <div className="mx-4">
                  <h4 className="text-slate-700 text-2xl font-bold">
                    {detail?.title}
                  </h4>
                  <h6 className="text-slate-700 mt-3 uppercase">Description</h6>
                  <p className="w-auto   text-gray-500  ">
                    {detail?.description}
                  </p>
                  <div className="flex w-52 mt-12">
                    <div className="w-1/3 uppercase text-slate-700">
                      <p>Rating</p>
                      <p>Release</p>
                      <p>Genre</p>
                      <p>Countries</p>
                      <p>Duration</p>
                    </div>
                    <div className="w-2/3 ml-8 text-gray-500">
                      <p>{numberStar ?? 0}</p>
                      <p>{day + "-" + month + "-" + year}</p>
                      <p>{detail?.genre}</p>
                      <p>{detail?.country}</p>
                      <p>{detail?.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5  mt-5 rounded-lg">
            <div className="pl-8 ">
              <h4 className="text-slate-700 text-2xl font-bold">Comment: </h4>
              <CommentMovie _id={detail?._id} />
            </div>
          </div>
        </div>
        <div className="h-1 bg-slate-700 w-[90%] mt-10 flex mx-20"></div>
        <div className="pt-10  mx-20">
          <h4 className="text-slate-700 font-bold text-2xl">Related movies</h4>
          <RelatedMovies genre={detail?.genre} _id={detail?._id} />
        </div>
      </div>
    </>
  );
}
