"use client"
import Link from 'next/link';
import React from 'react'
import { useEffect,useState } from 'react';
export default function Movies() {
  interface Movies{
    _id:string,
    image:string
    title:string
  }

  const [movies,setMovies]=useState<Movies[]>([])
  const [upcoming,setUpComing]=useState<Movies[]>([])
  useEffect(()=>{
    fetch("http://localhost:5000/admin/get-movies-released",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setMovies(data) 
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  useEffect(()=>{
    fetch("http://localhost:5000/admin/get-movies-upcoming",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      setUpComing(data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <div className="bg-slate-900">
      <h4 className="text-white ml-4 pt-4 text-2xl">Top Rate <span className='text-yellow-500'>&#9733;</span> </h4>
      <div className="mx-auto">
          <div className="flex pt-10 pl-6">
            <div className="w-3/4 grid grid-cols-5 gap-4">
              {movies.map((data,index)=>(
              <div className="overflow-hidden rounded-lg" key={index}>
                <Link href={`/movies/detail/${data._id}`}>
                <img className="rounded-lg w-52 h-64 transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out object-cover" src={data.image} alt="" />
                </Link>
              </div>
              ))}
            </div>
            <div className="w-1/4 gap-4">
              {upcoming.length>=1?
              (
                upcoming.map((data,index)=>(
                  <div className="flex flex-col gap-3 pl-5">
                    <img className='w-72 rounded hover:cursor-pointer' src={data.image} alt="" />
                    <h5 className='text-white text-bold'>{data.title}</h5>
                  </div>
                ))
              ):
              (
                <div className="block pl-5">
                <img className='w-72' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ07n5nPAV6lIMsOk0ABmjNdY9ZyTZe7-tGw&usqp=CAU" alt="" />
                <h5 className='text-white'>Hello world</h5>
              </div>
              )}
            </div>
          </div>
      </div>
    </div>
  )
}
