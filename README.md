
# Potable — Essentials, Delivered Pure

Full-stack e-commerce + delivery platform built for your spec:
- Elegant geo-fencing (never kills SEO/traffic)
- Smart modal, lazy hero, sticky header
- Cascading TZ regions + campus block/room validation
- Real-time order tracking via WebSocket
- Admin: Ledger, Fulfillment Queue, Reporting + Audit Log

## Quick Start
1. cp .env.example .env
2. npm install
3. npx prisma migrate dev --name init
4. npm run dev

Frontend: http://localhost:3000
Admin: http://localhost:3000/admin
API: http://localhost:4000

## Stack
- Frontend: Next.js 14 + Tailwind + Zustand (cart persistence)
- Backend: Express + Socket.io + Prisma + PostgreSQL
- SMS: Beem Africa / Twilio webhook ready
