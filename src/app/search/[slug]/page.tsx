"use client";

import { IP_URL } from "@/config";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  interface Search {
    title: string;
    genre: string;
    image: string;
    _id:string;
  }
  const param: any = useParams();
  const search = decodeURIComponent(param.slug);

  const [searchData, setSearchData] = useState<Search[]>([]);
  useEffect(() => {
    fetch(IP_URL + "admin/search-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
      },
      body: JSON.stringify({ search: search }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
      {searchData.length < 1 ? (
        <div className="pt-10 mx-auto w-2/3">
          <div className="flex justify-center items-center">
            <h5 className="text-white text-2xl">
              No results found for " {search} " key word
            </h5>
          </div>
        </div>
      ) : (
        <div className="pt-10 mx-auto">
          <div className="pl-5 gird grid-cols-5">
            <div className="flex justify-center items-center">
              <h5 className="text-white text-2xl">
              There are {searchData.length} results for this keyword
              </h5>
            </div>
            <div className="flex gap-4">
            {searchData.map((data,index)=>(
            <div className="col-span-1" key={index}>
              <Link href={`/movies/detail/${data._id}`}>
              <img
                className=" w-60 h-72 rounded-md"
                src={data.image}
                alt=""
              />
              </Link>
              <span className="text-xl text-white mt-1">{data.title}</span>
              <p className="text-sm text-white">Genre: <span className=" text-red-600">{data.genre}</span></p>
            </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
