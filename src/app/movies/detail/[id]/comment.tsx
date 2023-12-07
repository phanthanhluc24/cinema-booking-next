import { IP_URL } from '@/config'
import React, { useEffect,useState } from 'react'

export default function CommentMovie({_id}:any) {
    interface User{
        full_name:string
    }
    interface Comment{
        comment:string,
        userId:User
    }
    const [allComment,setAllComment]=useState<Comment| null>(null);

    useEffect(()=>{
        fetch(IP_URL+`comment/all-comment/${_id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data:Comment)=>{
            setAllComment(data)
            console.log(data);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    },[_id])
  return (
    <div className='pl-8 pt-6'>
        {allComment && Array.isArray(allComment) ? (
            allComment.map((comment, index) => (
                <div key={index}>
                    <div className='flex'>
                    <div className='w-[40px] h-[40px] rounded-full text-white flex text-center justify-center items-center bg-slate-700'>
                        {comment.userId.full_name.charAt(0)}
                        </div>
                    <h3 className='text-slate-700 flex items-center mx-2 justify-center text-md font-bold w-max rounded p-1'>{comment.userId.full_name}</h3>
                    </div>
                    <h2 className='pl-3 mx-10 text-slate-700'>{comment.comment}</h2>
                    
                </div>
            ))
        ) : (
            <p>No comments available.</p>
        )}
    </div>
  )
}
