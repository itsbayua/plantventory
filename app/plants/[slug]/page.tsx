import React from "react";
import PlantCard from "./PlantCard";
import { getPlantById } from "@/actions/plant.action";
import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);
    return {
        title: plant ? plant.name : "Plant Details",
        description: plant ? plant.description : "Plant Details Page",
    };
}

export default async function PlantDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const user = await stackServerApp.getUser();
    const { slug } = await params;
    const [id] = slug.split("--");
    const plant = await getPlantById(id);

    if (!user) {
        return <SignIn />;
    }

    return (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-full">
                <PlantCard plant={plant} />
            </div>
        </div>
    );
}
