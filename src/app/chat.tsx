// "use client"
// import { Form, Input,Button } from "antd";
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client"

// let socket:any;
// export default function Chat() {
//   const [status,setStatus]=useState(false)
//   const handleMessage=()=>{
//     setStatus(true)
//   }
//   const host="http://localhost:5000/"
//   interface Message{
//     message:string
//   }

//   const [id,setId]=useState()
//   const [message,setMessage]=useState("")
//   const [mess,setMess]=useState<Message[]>([])

//   // const socketRef=useRef<Socket|undefined>(undefined)

//   useEffect(()=>{
//     // socketInitializer()
//     const socket=io(host)
//     socket.on("connect",()=>{
//       console.log(socket.id);
      
//     })
//     return ()=>{
//       socket.disconnect()
//     }
//   },[])

//   // async function socketInitializer(){
//   //   await fetch("/api")
//   //   socket=io("http://localhost:3000");
//   //   socket.on("receive-message",({message}:Message)=>{
//   //     setMess((preMsg)=>[...preMsg,{message}])
//   //   })
//   // }

//   const handleContentMessage=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
//       const content=e.target.value
//       setMessage(content)
//   }

//   const handleSendMessage=(e:React.FormEvent)=>{
//       // e.preventDefault()
//       console.log("emitted");
//       socket.emit("send-message",{
//         message
//       })
//   }

//   // const reRenderMessage=mess.map((m,index)=>{
//   // return <div
//   //   key={index}
//   //   className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}
//   //   >
//   //     {m.content}
//   //   </div>
//   // })
//   return (
//     <div className="fixed bottom-0 right-0 p-4 cursor-pointer" >
//       {status == false?(
//         <div className="w-20 h-20 rounded-full bg-yellow-600 flex justify-center items-center wave-effect" onClick={handleMessage}>
//           <p>Message</p>
//         </div>

//       ):(
//         <div className=" w-80 h-96 bg-gray-200 rounded">
//           <div className="box-chat-message bg-red-500 w-12 h-12">
//             {mess.map((item,index)=>(
//               <li key={index}>{item.message}</li>
//             ))}
//           </div>
//           <div className="flex justify-center items-center">
//             <Form className="fixed bottom-0" onFinish={handleSendMessage}>
//                 <Form.Item>
//                   <div className="relative">
//                     <Input.TextArea name="content-message"  className="bg-white w-64 h-3 rounded-3xl outline-none border-none" style={{resize:"none"}} onChange={handleContentMessage}></Input.TextArea>
//                     <Button htmlType="submit" className="h-12 fa-solid fa-paper-plane right-1 absolute top-1/2 transform -translate-y-1/2 text-sm hover:cursor-pointer rounded-r-3xl bg-gray-300 outline-none border-none pl-2"></Button>
//                   </div>
//                 </Form.Item>
//                 {/* <i class=""></i> */}
//             </Form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
