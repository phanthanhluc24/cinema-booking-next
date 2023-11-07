"use client"
import React, { useState } from "react";
import { IP_URL } from "@/config";
export default function page() {
    interface AIChat{
        what:string,
        when:string,
        near:string,
        desc:string
    }
    const [question,setQuestion]=useState<AIChat>({what:"",when:"",near:"",desc:""})

    const [answer,setAnswer]=useState("")
    const [status,setStatus]=useState(false)
const handleAsks=()=>{
    const mainQuestion={
        question:`Chào bạn, tôi đang hư ${question.what} và tôi mua nó ${question.when}, 
        lần gần nhất mà tôi tôi sửa nó là: ${question.near} và 
        cuối cùng là tôi sẽ mô tả nó cho bạn: ${question.desc}. Bạn xem giúp tôi nó đang hư gì. 
        Có cần sửa chưa hay thử cách nào trước, nớ có ảnh huowgr đến môi trường không.`
    }
    
    if(question===null){return}
    fetch(IP_URL+"chat/ai-response",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(mainQuestion)
    })
    .then((res)=>res.json())
    .then((data)=>{
        setAnswer(data)
        console.log(data);
    })
    .catch((error)=>{
        console.log(error.message);
    })
    setStatus(true)
}
  return (
    <>
    {status===false?(
        <div className="mx-auto pt-16 w-2/4 border">
            <form action="" method="post" onSubmit={handleAsks}>
                <label htmlFor="">Bạn đang hư gì:</label> <br />
                <input type="text" className=" outline-none border-gray-600 border pl-1 rounded w-full h-10" placeholder="Vấn đề của bạn là gì:" onChange={(e)=>setQuestion(preState=>({...preState,what:e.target.value}))}/><br />
                <label htmlFor="">Bạn mua nó khi nào:</label><br />
                <input type="text" className="outline-none border-gray-600 border pl-1 w-full h-10" placeholder="Bạn mua nó khi nào" onChange={(e)=>setQuestion(preState=>({...preState,when:e.target.value}))}/><br />
                <label htmlFor="">Lần gần nhất bạn sửa nó:</label><br />
                <input type="text" className="outline-none border-gray-600 border pl-1 w-full h-10" placeholder="Bạn đã sửa nó chưa" onChange={(e)=>setQuestion(preState=>({...preState,near:e.target.value}))}/><br />
                <label htmlFor="">Mô tả tình trạng hư hỏng của bạn nào:</label><br />
                <textarea name="" id="" cols={30} rows={10} placeholder="Mô tả tình trạng" className="border-gray-600 border outline-none pl-1 w-full" onChange={(e)=>setQuestion(preState=>({...preState,desc:e.target.value}))}></textarea><br />
                <div className="flex items-center justify-center">
                    <button type="submit" className="px-2 py-2 bg-green-500 rounded">Scan</button>
                </div>
            </form>
        </div>

    ):(
        <div className="mx-auto w-2/4 bg-slate-800 border h-screen pt-16">
            {answer===""?(
                <p className="text-white">Please wait a minutes</p>

            ):(
                <p className="text-white whitespace-pre-line">{answer}</p>
            )}
        </div>
    )}
    </>
  );
}
