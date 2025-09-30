"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/lib/generated/prisma";

export async function getPlants(searchTerm?: string) {
    try {
        const currentUser = await getUserId();

        const whereClause: any = {
            userId: currentUser,
        };

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive",
            };
        }

        const userPlants = await prisma.plant.findMany({
            where: whereClause,
        });

        return { success: true, userPlants };
    } catch (error) {
        console.error("Error fetching plants:", error);
        throw new Error("Failed to fetch plants");
    }
}

export async function getPlantById(id: string) {
    // Example using Prisma; adjust based on your data layer
    return await prisma.plant.findUnique({
        where: { id },
    });
}

export async function createPlant(data: Prisma.PlantCreateInput) {
    console.log("creating plant");
    console.log(data);
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) return;

        const newPlant = await prisma.plant.create({
            data: {
                ...data,
                userId: currentUserId,
            },
        });
        revalidatePath("/plants");
        return newPlant;
    } catch (error) {
        console.error("Error Creating Plant:", error);
        throw error;
    }
}
