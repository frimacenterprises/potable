
'use client';
import { useState } from "react";

export default function CampusForm({onSubmit}:{onSubmit:(v:any)=>void}){
  const [block,setBlock]=useState("");
  const [room,setRoom]=useState(1);
  return (
    <form onSubmit={e=>{e.preventDefault(); const fd=new FormData(e.currentTarget as any); onSubmit({block:block.toUpperCase(), room, phone:fd.get("phone"), isCampus:true});}} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input value={block} onChange={e=>setBlock(e.target.value.toUpperCase())} placeholder="BLOCK e.g. A-12" pattern="[A-Z]{1,3}-[0-9]{1,3}[A-Z]?" required className="border p-2 rounded uppercase"/>
        <div className="flex items-center border rounded">
          <button type="button" onClick={()=>setRoom(Math.max(1,room-1))} className="px-3">-</button>
          <span className="flex-1 text-center">{room}</span>
          <button type="button" onClick={()=>setRoom(Math.min(500,room+1))} className="px-3">+</button>
        </div>
      </div>
      <input name="phone" placeholder="Phone 07xx" required className="border p-2 rounded w-full"/>
      <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Place Order - Campus</button>
    </form>
  )
}
