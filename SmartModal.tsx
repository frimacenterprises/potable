
'use client';
import { useEffect, useState } from "react";

export default function SmartModal(){
  const [show, setShow]=useState(false);
  useEffect(()=>{
    if(sessionStorage.getItem("potable_modal_seen")) return;
    const timer=setTimeout(()=>setShow(true), 5000);
    const onExit=(e:MouseEvent)=>{ if(e.clientY<20) setShow(true); };
    document.addEventListener("mouseleave", onExit as any);
    return ()=>{ clearTimeout(timer); document.removeEventListener("mouseleave", onExit as any); };
  },[]);
  if(!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-sm w-[90%] shadow-xl">
        <h3 className="font-bold text-lg">First order on Potable? 💧</h3>
        <p className="text-sm text-slate-600 mt-1">Get 10% off your essentials today. Campus delivery in minutes.</p>
        <div className="flex gap-2 mt-4">
          <button onClick={()=>{sessionStorage.setItem("potable_modal_seen","1"); setShow(false);}} className="flex-1 bg-slate-900 text-white py-2 rounded-xl">Shop Now</button>
          <button onClick={()=>{sessionStorage.setItem("potable_modal_seen","1"); setShow(false);}} className="flex-1 border py-2 rounded-xl">Maybe later</button>
        </div>
      </div>
    </div>
  )
}
