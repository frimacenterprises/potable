
'use client';
import { useState } from "react";
import { TZ_DATA } from "@/lib/tzLocations";

export default function OffCampusForm({onSubmit}:{onSubmit:(v:any)=>void}){
  const regions = Object.keys(TZ_DATA);
  const [region,setRegion]=useState(regions[0]);
  const [district,setDistrict]=useState(Object.keys(TZ_DATA[region as keyof typeof TZ_DATA])[0]);
  const districts = Object.keys(TZ_DATA[region as keyof typeof TZ_DATA] || {});
  const streets = (TZ_DATA[region as keyof typeof TZ_DATA] as any)?.[district] || [];

  return (
    <form onSubmit={e=>{e.preventDefault(); const fd=new FormData(e.currentTarget as any); onSubmit({region, district, street:fd.get("street"), phone:fd.get("phone"), isCampus:false});}} className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <select value={region} onChange={e=>{setRegion(e.target.value); setDistrict(Object.keys(TZ_DATA[e.target.value as keyof typeof TZ_DATA])[0]);}} className="border p-2 rounded">{regions.map(r=><option key={r}>{r}</option>)}</select>
        <select value={district} onChange={e=>setDistrict(e.target.value)} className="border p-2 rounded">{districts.map(d=><option key={d}>{d}</option>)}</select>
        <select name="street" className="border p-2 rounded">{streets.map((s:string)=><option key={s}>{s}</option>)}</select>
      </div>
      <input name="phone" placeholder="Phone 07xx xxx xxx" required className="border p-2 rounded w-full"/>
      <button className="w-full bg-[#0EA5E9] text-white py-3 rounded-xl font-bold">Place Order - COD</button>
    </form>
  )
}
