import React from 'react'
import Movies from './movies/movies'
// import Chat from './chat'

export function Poster(){
  return (
    <>
    <div>
        <img src="https://i.ytimg.com/vi/uYPbbksJxIg/maxresdefault.jpg" alt="" className='w-screen h-[730px]'/>
    </div>
    <Movies/>
    {/* <Chat/> */}
    </>

  )
}


