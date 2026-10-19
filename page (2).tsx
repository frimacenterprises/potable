
'use client';
import { useState } from "react";
import CampusForm from "@/components/CampusForm";
import OffCampusForm from "@/components/OffCampusForm";
import { useCart } from "@/store/cartStore";

export default function Checkout(){
  const [tab,setTab]=useState<"campus"|"off">("campus");
  const {total, items} = useCart();
  const submit = async (data:any)=>{
    const res = await fetch("/api/orders",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...data, total: total(), items})});
    const order = await res.json();
    // success micro-interaction
    window.location.href=`/orders?id=${order.id}`;
  };
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-black">Checkout</h1>
      <div className="flex gap-2 mt-4"><button onClick={()=>setTab("campus")} className={`flex-1 py-2 rounded-xl ${tab==="campus"?"bg-slate-900 text-white":"border"}`}>On-Campus</button><button onClick={()=>setTab("off")} className={`flex-1 py-2 rounded-xl ${tab==="off"?"bg-slate-900 text-white":"border"}`}>Off-Campus</button></div>
      <div className="mt-6">{tab==="campus"?<CampusForm onSubmit={submit}/>:<OffCampusForm onSubmit={submit}/>}</div>
    </div>
  )
}
