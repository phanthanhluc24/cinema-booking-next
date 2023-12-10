"use client"
import Link from 'next/link'
import React from 'react'
import SearchForm from './search-form'
import { usePathname } from 'next/navigation'

export default function ItemHeader() {
    const pathname = usePathname()
    return (
        <>
            <li className="ml-4 hover:cursor-pointer">
                <a href="#" className="flex">
                    <h4 className="text-blue-400 text-xl">XH</h4>
                    <h4 className="text-red-400 text-xl">TD</h4>
                </a>
            </li>
            <li className={`ml-6 hover:cursor-pointer ${pathname === "/" ? 'text-red-500' : "text-white"}`}>
                <Link href="/">Home</Link>
            </li>
            <li className={`ml-6 hover:cursor-pointer ${pathname === "/movies/streaming" ? 'text-red-500' : 'text-white'}`}>
                <Link href="/movies/streaming">Streaming</Link>
            </li>
            <li className={`ml-6 hover:cursor-pointer ${pathname === "/movies/upcoming" ? 'text-red-500' : "text-white"}`}>
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
        </>
    )
}
