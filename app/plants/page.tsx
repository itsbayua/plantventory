import { getPlants } from "@/actions/plant.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import React from "react";

export default async function PlantsPage() {
    const user = await stackServerApp.getUser();
    const plant = await getPlants();

    return (
        <>
            {user ? (
                <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
                    <div className="lg:col-span-full">
                        <InventoryTable plants={plant} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center my-20 items-center">
                    <SignUp />
                </div>
            )}
        </>
    );
}
