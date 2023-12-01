"use client";
import { IP_URL } from "@/config";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {toast} from "react-toastify"
import { useRouter } from "next/navigation";
export default function Book({ params }: any) {
  
  const router=useRouter()
  const cookie=new Cookies()
  const token=cookie.get("token")

  const headers={
    Authorization:`Bearer ${token}`
  }
  interface CinemaName {
    _id: String;
    cinema_name: String;
    show_times: string;
    capacity: number;
  }
  interface ShowTime {
    _id: String;
  }

  interface Booking {
    show_times: String;
    ticket_price: String;
    seat_number: any;
    movieId: String;
    cinemaId: String;
  }
  const [time, setTime] = useState<CinemaName>();
  const numberMax: number = time ? time.capacity : 0;
  const number: number[] = [];
  for (let index = 0; index < numberMax; index++) {
    number.push(index);
  }
  const [cinema, setCinema] = useState<CinemaName[]>([]);
  const [showtime, setShowTime] = useState<ShowTime>({ _id:""});
  const [seatExit,setSeatExit]=useState<number[]>([])
  useEffect(() => {
  // Check if there is at least one cinema in the cinema array
  if (cinema.length > 0) {
    setShowTime({ _id: cinema[0]._id });
  }
}, [cinema]);
  const [seat, setSeat] = useState<number[]>([]);
  const [background, setBackground] = useState<string[]>(
    Array(numberMax).fill("bg-gray-600")
  );

  
  // Get all number seat user choose and unchosen
  const getSeat = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const updateBackground = [...background];
    updateBackground[index - 1] =
    background[index - 1] === "bg-green-600" ? "bg-gray-600" : "bg-green-600";
    setBackground(updateBackground);
    
    if (seat.includes(index)) {
      setSeat(seat.filter((indexSear) => indexSear != index));
    } else {
      setSeat([...seat, index]);
    }
  };
  
  // Display seat user choose
  var seatArray: any[] = [];
  for (let i = 0; i < seat.length; i++) {
    seatArray.push(seat[i]);
    if (i < seat.length - 1) {
      seatArray.push(",");
    }
  }

  // Get time to display seat
  const [times,setTimes]=useState({time:"12"})

  const handleGetTime=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setTimes({time:e.target.value})
  }

  const data={
    movieId:params.id,
    cinemaId:showtime._id,
    show_times:times.time
  }
  useEffect(()=>{
    fetch(IP_URL+"booking/seat-already",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data)=>{
      setSeatExit(data)
      console.log(data);
      
    })
    .catch((error)=>{
      console.log(error);
    })
  },[showtime._id,times.time])
  

  // Get all the of the cinema form DB
  useEffect(() => {
    fetch(IP_URL + "cinema/cinema-name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCinema(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Render a seat
  useEffect(() => {}, [seat]);

  // Get time form DB form a cinema
  useEffect(() => {
    if (showtime._id) {
      fetch(IP_URL + `cinema/get-time-show/${showtime._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTime(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [showtime._id]);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = { ...showtime, [e.target.name]: e.target.value };
    setShowTime(data);
  };
  // Get time form DB and split , to display on the screen
  const arr: any = `${time?.show_times}`;
  const parts = arr.split(",");
  const timeShow = [];
  for (let index = 0; index < parts.length; index++) {
    timeShow.push(parts[index]);
  }
  
  // Arrange seat to calculating money for seat
  const quantitySeat: any = time?.capacity;
  var total = 0;
  for (let i = 0; i < quantitySeat; i++) {
    for (let j = 0; j < seat.length; j++) {
      if (i + 1 == seat[j]) {
        if (seat[j] < 30) {
          total += 200;
        } else if (seat[j] <= 50) {
          total += 100;
        } else if (seat[j] > 50) {
          total += 50;
        }
      }
    }
  }


  const handleSubmitForm=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const seat=document.querySelector(".seatArray")?.innerHTML
    const price=document.querySelector(".ticket_price")?.innerHTML
    const cinemaId=document.querySelector("#movieId") as HTMLSelectElement
    const times=document.querySelector("#show_times") as HTMLSelectElement
    const movieId=params.id
    if (seat==="") {
      toast("Please choose your seat",{hideProgressBar:false,autoClose:3000,type:"warning"})
      return
    }
    const booking={
      seat_number:seat,
      ticket_price:price,
      show_times:times.value,
      movieId:movieId,
      cinemaId:cinemaId.value
    }

    if(!token){
      toast("Please login before booking",{hideProgressBar:false,autoClose:3000,type:"warning"})
      return
    }else{
      fetch(IP_URL+"booking/ticket/cinema",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          ...headers
        },
        body:JSON.stringify(booking)
      })
      .then((res)=>res.json())
      .then((data)=>{
        if (data.status=201) {
          toast("Booking success!",{hideProgressBar:false,autoClose:3000,type:"success"})
          router.back()
        } 
      })  
      .catch((error)=>{
        console.log(error);
      })

      // fetch(IP_URL+"payment",{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application.json"
      //   },
      //   body:JSON.stringify(booking.ticket_price)
      // })
      // .then((res)=>res.json())
      // .then((data)=>{
      //   console.log(data);
      //   router.push(data)
      // })
      // .catch((error)=>{
      //   console.log(error);
        
      // })
    }
  }
  return (
    <div className=" bg-slate-900 min-h-screen">
      <div className="flex justify-center items-center text-xl text-red-500 uppercase font-bold pt-7">
        Welcome to booking ticket
      </div>
      <div className="mx-auto w-2/3 mt-32">
        <div className="grid grid-cols-2 gap-4">
          <form action="" method="post" onSubmit={handleSubmitForm}>
            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="" className="font-bold text-2xl text-red-500 ">
                  Choose Cinema:{" "}
                </label>
                <select
                  name="_id"
                  id="movieId"
                  className="px-3 py-2 w-44 rounded text-white bg-gray-600"
                  onChange={handleSelectOption}
                  title="Choose"
                >
                  {cinema.map((data, index) => (
                    <option
                      value={String(data._id)}
                      key={index}
                      className="pt-3"
                    >
                      {data.cinema_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="font-bold text-2xl text-red-500 ">
                  Choose times:{" "}
                </label>
                <select
                  name="show_times"
                  id="show_times"
                  className="px-3 py-2 w-44 rounded text-white bg-gray-600"
                  onChange={handleGetTime}
                  title="Choose"
                >
                  {timeShow.map((data, index) => (
                    <option value={data} key={index} className="pt-3">
                      {data}:00
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="font-bold text-2xl text-red-500 ">
                  Total price: <span className="ticket_price">{total + "000"}</span>{" "}
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="" className="font-bold text-2xl text-red-500 ">
                  Seat: <span className="seatArray">{seatArray}</span>{" "}
                </label>
              </div>

              <div className="mt-20 py-2 px-3 bg-green-600 rounded hover:cursor-pointer flex justify-center align-items text-center">
                <button type="submit" className="uppercase font-bold text-white">
                    Booking
                </button>
              </div>
            </div>
          </form>
          <div className="col-span-1 mb-6">
            <div className="grid gap-4 grid-cols-10">
              {number.map((data, index) => (
                <div className=" col-span-1" key={index}>
                  {seatExit.includes(index + 1) ? (
                    <div
                      className={`h-7 w-7 text-white bg-red-500 hover:cursor-not-allowed  flex justify-center items-center rounded`}
                    >
                      {0 + index + 1}
                    </div>
                  ) : (
                    <div
                      className={`h-7 w-7 text-white hover:cursor-pointer bg-gray-600 flex justify-center items-center rounded ${background[index]}`}
                      onClick={getSeat(index + 1)}
                    >
                      {0 + index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
