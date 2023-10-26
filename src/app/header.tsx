import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cookies } from "next/headers";
import IdentifyUser from "./server/page";
import SearchForm from "./search-form";
export default function Header() {
  const cookie = cookies();
  const already = cookie.get("token");
  return (
    <>
      <nav className="bg-slate-700 fixed min-w-full z-10">
        <ul className="flex items-center mx-auto w-2/3 justify-around uppercase h-14 ">
          <li className="ml-4 hover:cursor-pointer">
            <a href="#" className="flex">
              <h4 className="text-blue-400 text-xl">XH</h4>
              <h4 className="text-red-400 text-xl">TD</h4>
            </a>
          </li>
          <li className="ml-6 hover:cursor-pointer hover:animate-shake text-white">
            <Link href="/">Home</Link>
          </li>
          <li className="ml-6 hover:cursor-pointer hover:underline hover:underline-xl text-white">
            <Link href="/movies/streaming">Streaming</Link>
          </li>
          <li className="ml-6 hover:cursor-pointer text-white">
            <Link href="/movies/upcoming">Upcoming</Link>
          </li>
          <li className="ml-6 relative">
            <SearchForm></SearchForm>
          </li>
          <li className="ml-6 hover:cursor-pointer group relative">
            <i className="fa-solid fa-bars text-xl text-white"></i>
            <ul className="hidden absolute group-hover:block bg-slate-500 flex-col justify-center text-center rounded">
              <li className="hover:cursor-pointer text-white w-32 mt-3 flex justify-center text-center">
                <Link href="/auth/logout">Log out</Link>
              </li>
            </ul>
          </li>
          <li>
            {already ? (
              <>
                <IdentifyUser token={already}></IdentifyUser>
              </>
            ) : (
              <p className="ml-6 hover:cursor-pointer hover:animate-shake text-white">
                <Link href="/auth/login/user-login">Login</Link>
              </p>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
