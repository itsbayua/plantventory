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

export async function editPlant(id: string, data: Prisma.PlantUpdateInput) {
    try {
        const currentUserId = await getUserId();
        const updatedPlant = await prisma.plant.update({
            where: { id },
            data: {
                ...data,
                userId: currentUserId,
            },
        });

        if (updatedPlant) {
            revalidatePath("/plants");
        } else {
            throw new Error("Plant not found");
        }
    } catch (error) {
        console.error("Error Updating Plant:", error);
        throw error;
    }
}

export async function deletePlant(id: string) {
    try {
        const currentUser = await getUserId();
        if (!currentUser) {
            return;
        }

        await prisma.plant.delete({
            where: { id },
        });

        revalidatePath("/plants");
    } catch (error) {
        console.error("Error Deleting Plant:", error);
        throw error;
    }
}
