
'use client';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const steps = ["PENDING","PACKING","EN_ROUTE","ARRIVED","COMPLETED"];

export default function OrderTimeline({orderId}:{orderId:string}){
  const [status,setStatus]=useState("PENDING");
  useEffect(()=>{
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
    socket.emit("join_order", orderId);
    socket.on("order_status", (s)=>setStatus(s));
    fetch(`/api/orders/${orderId}`).then(r=>r.json()).then(d=>setStatus(d.status));
    return ()=>{socket.disconnect();}
  },[orderId]);

  return (
    <div className="flex gap-2 overflow-x-auto">
      {steps.map(s=>{
        const active = steps.indexOf(s) <= steps.indexOf(status);
        return <div key={s} className={`px-3 py-2 rounded-full text-xs font-bold ${active?"bg-[#0EA5E9] text-white":"bg-slate-100 text-slate-400"}`}>{s}</div>
      })}
    </div>
  )
}
