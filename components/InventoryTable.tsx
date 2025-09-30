"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plant;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter plants by name and category (if selected)
    const filteredPlants = plants.userPlants.filter(
        (plant) =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "" || plant.category === selectedCategory)
    );

    if (!plants) {
        return (
            <div className="w-full space-y-4">
                <div className="flex items-center gap-2 py-4">
                    <Skeleton className="h-10 w-full max-w-sm" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead>
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                            <TableHead className="text-right">
                                <Skeleton className="w-full h-4" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="w-full h-4" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filter plants...."
                        className="pl-10"
                    />
                    <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <Combobox
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                />
                <CreateDialog />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plant ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPlants?.map((plant) => {
                        const slugFieldName = plant.name
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                        const slug = `${plant.id}--${slugFieldName}`;
                        const plantUrl = `/plants/${slug}`;
                        return (
                            <TableRow
                                onClick={() => router.push(plantUrl)}
                                key={plant.id}
                            >
                                <TableCell>{plant.id}</TableCell>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.category}</TableCell>
                                <TableCell>{plant.price}</TableCell>
                                <TableCell className="font-bold">
                                    {plant.stock}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div
                                        className="flex justify-end space-x-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EditDialog plant={plant} />
                                        <DeleteDialog plant={plant} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
