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
    <div className='pl-24 pt-6'>
        {allComment && Array.isArray(allComment) ? (
            allComment.map((comment, index) => (
                <div key={index}>
                    <h3 className='text-white text-xl w-max rounded p-1 border'>{comment.userId.full_name}</h3>
                    <h2 className='pl-3 text-white'>{comment.comment}</h2>
                </div>
            ))
        ) : (
            <p>No comments available.</p>
        )}
    </div>
  )
}
