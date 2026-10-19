
import { z } from "zod";

export const campusBlockRegex = /^[A-Z]{1,3}-[0-9]{1,3}[A-Z]?$/; // e.g., A-12, MAB-102

export const offCampusSchema = z.object({
  region: z.string().min(1),
  district: z.string().min(1),
  street: z.string().min(1),
  phone: z.string().min(10),
});

export const campusSchema = z.object({
  block: z.string().regex(campusBlockRegex, "Block format invalid e.g., A-12").transform(v=>v.toUpperCase()),
  room: z.number().int().min(1).max(500),
  phone: z.string().min(10),
});
