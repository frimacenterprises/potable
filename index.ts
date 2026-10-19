
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { sendTransactionalSMS, SMS_TEMPLATES } from "../lib/sms";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors:{origin:"*"} });

// --- Geo + Leads ---
app.post("/api/leads", async(req,res)=>{
  const {email, lat,lng} = req.body;
  const lead = await prisma.lead.create({data:{email, lat,lng}});
  res.json(lead);
});

// --- Orders ---
app.post("/api/orders", async(req,res)=>{
  const {total, items, region, district, street, campusBlock, campusRoom, phone, isCampus} = req.body;
  const order = await prisma.order.create({
    data:{
      total,
      grossSales: total,
      netRevenue: Math.round(total*0.27),
      region, district, street,
      campusBlock, campusRoom,
      customerPhone: phone,
      isCampus,
      status:"PENDING",
      items:{create: (items||[]).map((i:any)=>({productId:i.id, qty:i.qty, price:i.price}))},
      auditLogs:{create:{toStatus:"PENDING"}}
    }
  });
  io.to(`order_${order.id}`).emit("order_status","PENDING");
  res.json(order);
});

app.get("/api/orders/:id", async(req,res)=>{
  const order = await prisma.order.findUnique({where:{id:req.params.id}});
  res.json(order);
});

app.post("/api/admin/orders/:id/status", async(req,res)=>{
  const {status} = req.body;
  const order = await prisma.order.update({where:{id:req.params.id}, data:{status}});
  await prisma.auditLog.create({data:{orderId:order.id, toStatus:status, changedBy:"admin"}});
  io.to(`order_${order.id}`).emit("order_status",status);
  if(status==="EN_ROUTE") await sendTransactionalSMS(order.customerPhone, SMS_TEMPLATES.DISPATCHED(order.id));
  if(status==="ARRIVED") await sendTransactionalSMS(order.customerPhone, SMS_TEMPLATES.ARRIVED(order.id));
  if(status==="COMPLETED") await sendTransactionalSMS(order.customerPhone, SMS_TEMPLATES.FEEDBACK(order.id));
  res.json(order);
});

// --- Socket ---
io.on("connection",(socket)=>{
  socket.on("join_order",(orderId)=>{ socket.join(`order_${orderId}`); });
});

server.listen(4000, ()=>console.log("Potable API + Socket on :4000"));
