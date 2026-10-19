#!/bin/bash
echo "=== Potable - Kuunganisha na Supabase ==="
echo "1. Badilisha [YOUR-PASSWORD] kwenye .env na password yako halisi"
echo "2. Kisha run:"
echo "   npx prisma db push"
echo "   au"
echo "   npx prisma migrate dev --name init"
echo ""
echo "Baada ya hapo, tables zitaonekana kwenye Supabase Schema Visualizer"
echo ""
read -p "Umeweka password? (y/n): " ans
if [ "$ans" = "y" ]; then
  npx prisma db push
fi
