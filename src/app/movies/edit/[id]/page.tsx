"use client";
import React, { useState ,useRef, useEffect} from "react";
import { Form, Input, Button ,FormInstance} from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IP_URL } from "@/config";
import Navbar from "../../navbar";
export default function Edit({params}:any) {
  const router=useRouter()
  interface newMovie {
    title: string;
    release_date: Date;
    genre: string;
    director: string;
    actors: string;
    duration: number;
    language: string;
    country: string;
    price: string;
    movie_url: string;
    image: string;
    description: string;
  }

  const [movie, setMovie] = useState<newMovie>({
    title: "",
    release_date: new Date(),
    genre: "",
    director: "",
    actors: "",
    duration: 0,
    language: "",
    country: "",
    price: "",
    movie_url: "",
    image: "",
    description: "",
  });

  const handleInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...movie, [e.target.name]: e.target.value };
    setMovie(data);
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMovie({ ...movie, description: e.target.value });
  };

    useEffect(()=>{
      fetch(IP_URL + `admin/movie/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMovie(data)
        })
        .catch((error) => {
          console.log(error);
          
        });
    },[params.id])

    const handleSubmitForm=()=>{
      fetch(IP_URL+`admin/update-movie/${params.id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(movie)
      })
      .then((res)=>res.json())
      .then((data)=>{
        if (data.status==201) {
          toast("Update successfully!",{hideProgressBar:false,autoClose:3000, type:"success"})
          router.back()
        }
        console.log(data);
      })
      .catch((error)=>{
        console.log(error);
      })
      
    }
    

    const fetchedDate=movie.release_date
    const dateObject=new Date(fetchedDate)
    const date=dateObject.toISOString().split("T")[0]

    
  return (
    <>
      <div className="mx-auto h-screen flex">
        <div className="w-1/4 bg-gray-700 mr-5">
         <Navbar/>
        </div>
        <div className="w-3/4">
          <div className="mx-auto w-3/3 mr-5 shadow-lg">
            <form action="" onSubmit={handleSubmitForm} method="post">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold mb-2 block text-gray-500 text-lg"
                    >
                      Name of movie
                    </label>
                    <input type="text" name="title" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.title} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block font-bold mb-2 text-gray-500 text-lg"
                    >
                      Genre
                    </label>
                    <input type="text" name="genre" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.genre} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="block text-gray-500 font-bold mb-2 text-lg"
                    >
                      Language
                    </label>
                    <input type="text" name="language" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.language} onChange={handleInputForm}/>
                   
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Country
                    </label>
                    <input type="text" name="country" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.country} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Actors
                    </label>
                   <input type="text" name="actors" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.actors} onChange={handleInputForm}/>
                  </div>
                </div>
                <div className="col-span-1 mt-1.5">
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Release date
                    </label>
                    <input type="date" value={date} name="release_day" onChange={handleInputForm} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500"/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Duration
                    </label>
                    <input type="text" name="duration" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.duration} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Price
                    </label>
                    <input type="text" name="price" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.price} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Movie url
                    </label>
                    <input type="text" name="movie_url" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.movie_url} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Image url
                    </label>
                    <input type="text" name="image" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.image} onChange={handleInputForm}/>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="font-bold text-gray-500 block mb-2"
                    >
                      Director
                    </label>
                    <input type="text" name="director" required={true} className="w-full h-9 outline-none border rounded pl-3 focus:border-gray-500" value={movie.director} onChange={handleInputForm}/>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="text-gray-500 text-lg font-bold block">
                  Description
                </label>
                <textarea name="description" id="" required={true} cols={30} className="w-full  outline-none border rounded pl-3 focus:border-gray-500 h-32" rows={10} value={movie.description} onChange={handleTextArea}></textarea>
              </div>

              <div className="flex justify-center items-center gap-3 ">
                <button
                  type="submit"
                  className="uppercase text-white bg-green-500 rounded py-2 px-3"
                >
                  Update
                </button>{" "}
                <button
                  type="button"
                  className="uppercase text-white bg-gray-500 rounded py-2 px-3"
                  onClick={()=>router.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
        
          </div>
        </div>
      </div>
    </>
  );
}
