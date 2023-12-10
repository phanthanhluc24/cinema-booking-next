"use client"
import { IP_URL } from '@/config'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Streaming() {
  interface Movies {
    _id: string,
    image: string
    title: string
  }
  const [streamingMovie, setSteamingMovie] = useState<Movies[]>([])
  useEffect(() => {
    fetch(IP_URL + "admin/get-movies-released", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSteamingMovie(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  return (
    <div>
      <div className="mx-auto bg-gray-900 min-h-screen pt-20">
        <div className="grid grid-cols-5 gap-1 pt-10 ml-6">
          {streamingMovie.map((data, index) => (
            <div className="col-span-1 z-0" key={index}>
              <Link href={`/movies/detail/${data._id}`}>
                <img className="rounded-lg w-56 h-72 transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out object-cover" src={data.image} alt="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
