
export default function AdminDashboard(){
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black">Potable Control</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="border rounded-2xl p-4"><div className="text-xs text-slate-500">Gross Sales</div><div className="text-2xl font-bold">TZS 2.4M</div></div>
        <div className="border rounded-2xl p-4"><div className="text-xs text-slate-500">Net Revenue</div><div className="text-2xl font-bold">TZS 640k</div></div>
        <div className="border rounded-2xl p-4"><div className="text-xs text-slate-500">AOV</div><div className="text-2xl font-bold">TZS 12k</div></div>
        <div className="border rounded-2xl p-4"><div className="text-xs text-slate-500">Pending</div><div className="text-2xl font-bold">8</div></div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <a href="/admin/orders" className="border rounded-2xl p-6 hover:bg-slate-50">📦 Fulfillment Queue - Pending / Packing / En Route</a>
        <a href="/admin/ledger" className="border rounded-2xl p-6 hover:bg-slate-50">💰 Ledger + Line Charts</a>
        <a href="/admin/reports" className="border rounded-2xl p-6 hover:bg-slate-50">📊 Reports Export CSV/XLSX/PDF + Audit Log</a>
      </div>
    </div>
  )
}
