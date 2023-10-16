import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div>
       <div className="flex flex-col pt-5">
            <div className="flex justify-center items-center">
              <button className="px-3 py-2 bg-slate-400 rounded w-48">
                DASHBOARD
              </button>
            </div>
            <hr className="mt-2" />
            <div className="flex flex-col">
              <ul className="mx-auto w-2/3 text-white space-y-2 pt-10">
                <li className="group relative rounded bg-slate-400 pl-3 px-4 py-2">
                  Movie
                  <ul className="font-bold hidden absolute z-10 left-0 ml-5 border border-gray-300 rounded-lg shadow-lg py-1 group-hover:block bg-slate-400">
                    <Link href={"/movies/create"} className="px-4 py-2 hover:bg-gray-100 w-60 text-gray-800 rounded cursor-pointer block">
                      Add new movie
                    </Link>
                    <Link href={"/movies/all-movie"} className="px-4 py-2 hover:bg-gray-100 text-gray-800 rounded cursor-pointer block">
                      All movie
                    </Link>
                    <Link href={""} className="px-4 py-2 hover:bg-gray-100 text-gray-800 rounded cursor-pointer block">
                      Top movie
                    </Link>
                  </ul>
                </li>
                <li className='group relative rounded bg-slate-400 pl-3 px-4 py-2'>
                  Cinema
                  <ul className='font-bold hidden absolute z-10 left-0 ml-5 border border-gray-300 rounded-lg shadow-lg py-1 group-hover:block bg-slate-400'>
                  <Link href={"/cinemas/create"} className="px-4 py-2 hover:bg-gray-100 w-60 text-gray-800 rounded cursor-pointer block">
                      Add new cinema</Link>
                  <Link href={"/cinemas/all-cinemas"} className="px-4 py-2 hover:bg-gray-100 w-60 text-gray-800 rounded cursor-pointer block">
                      All cinema
                  </Link>
                  </ul>
                  </li>
                <li className='group relative rounded bg-slate-400 pl-3 px-4 py-2'>User</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
    </div>
  )
}
