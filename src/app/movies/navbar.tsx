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
              <ul className="mx-auto w-2/3 text-white space-y-2">
                <li className="group relative">
                  Movie
                  <ul className="font-bold hidden absolute z-10 left-0 ml-5 border border-gray-300 rounded-lg shadow-lg py-1 group-hover:block">
                    <li className="px-4 py-2 hover:bg-gray-100 w-60 text-gray-800 rounded">
                      Add new movie
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 text-gray-800 rounded">
                      All movie
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 text-gray-800 rounded">
                      Top movie
                    </li>
                  </ul>
                </li>
                <li className='group relative'>
                  Cinema
                  <ul className='hidden absolute ml-5 font-bold z-10 left-0 group-hover:block border border-gray-300 rounded-lg py-1'>
                    <li className='px-4 py-2 hover:bg-gray-100 text-gray-800 rounded'>
                      Add new cinema</li>
                    <li className='px-4 py-2 hover:bg-gray-100 text-gray-800 rounded'>
                      All cinema
                    </li>
                  </ul>
                  </li>
                <li>User</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
    </div>
  )
}
