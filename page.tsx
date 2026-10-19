
import GeoBanner from "@/components/GeoBanner";
import SmartModal from "@/components/SmartModal";

export default function Home(){
  return (
    <main>
      <GeoBanner />
      <SmartModal />
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2 font-black text-xl"><img src="/logo.png" className="w-8 h-8"/> Potable</div>
          <nav className="flex gap-4 text-sm"><a href="/">Marketplace</a><a href="/orders">My Order</a><a href="/history">History</a><a href="/admin">Admin</a></nav>
        </div>
      </header>
      <section className="max-w-6xl mx-auto p-4">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0EA5E9] to-[#0F172A] text-white p-10">
          <h1 className="text-4xl font-black">Pure Essentials<br/>Delivered to Your Block.</h1>
          <p className="mt-3 opacity-80">Campus in minutes, off-campus across Dar. Real-time tracking, zero errors.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {["Water 20L","Soda Pack","Bread","Snacks"].map(p=>(
            <div key={p} className="border rounded-2xl p-4"><div className="h-24 bg-slate-100 rounded-xl"/><h4 className="mt-2 font-bold">{p}</h4><button className="mt-2 w-full bg-slate-900 text-white py-2 rounded-xl text-sm">Add</button></div>
          ))}
        </div>
      </section>
    </main>
  )
}
