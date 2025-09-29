"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

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
