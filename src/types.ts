import { z } from "zod";
import { Tag as PrismaTag } from "@prisma/client";
export type Location = {
  lat: number;
  lng: number;
};

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export const TagLabels: Record<PrismaTag, string> = {
  PET_FRIENDLY: "Pet Friendly",
  SMOKE_FRIENDLY: "Smoke Friendly",
  FREE_PARKING: "Free Parking",
  FREE_WIFI: "Free WiFi",
  POOL: "Pool",
};

export type RoomType = "Single" | "Double" | "Triple" | "Quad";

export interface Person {
  age: number;
  gender: Gender;
  description: string;
}

export const zodPersonSchema = z.object({
  age: z.number(),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
  description: z.string(),
});
export const zodRoomTypeSchema = z.enum(["Single", "Double", "Triple", "Quad"]);
export const zodPrismaTypeSchema = z.nativeEnum(PrismaTag);

export { Tag } from "@prisma/client";
