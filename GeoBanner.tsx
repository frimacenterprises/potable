
'use client';
import { useEffect, useState } from "react";
import { checkServiceability } from "@/lib/geo";

export default function GeoBanner(){
  const [state, setState] = useState<{isServiceable:boolean, km:number}|null>(null);
  const [email, setEmail] = useState("");

  useEffect(()=>{
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos=>{
      const res = checkServiceability({lat:pos.coords.latitude, lng:pos.coords.longitude});
      setState(res);
      localStorage.setItem("potable_geo", JSON.stringify(res));
    }, ()=>{});
  },[]);

  if(!state || state.isServiceable) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-3 flex flex-col md:flex-row gap-2 items-center justify-between">
      <span className="text-sm font-medium">📍 Potable doesn't deliver {state.km.toFixed(1)}km from our hub yet. You can still browse. Get notified when we expand.</span>
      <form onSubmit={async(e)=>{
        e.preventDefault();
        await fetch("/api/leads",{method:"POST", body:JSON.stringify({email})});
        alert("Asante! We'll notify you.");
        setEmail("");
      }} className="flex gap-2">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your email" className="px-3 py-1 rounded border text-sm"/>
        <button className="bg-slate-900 text-white px-3 py-1 rounded text-sm">Notify Me</button>
      </form>
    </div>
  )
}
