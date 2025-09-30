import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Sprout } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Combobox } from "./ui/combo-box";
import { createPlant } from "@/actions/plant.action";
import toast from "react-hot-toast";

export default function CreateDialog() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 1,
        price: 1,
        category: "",
        userId: "",
        imageUrl: "",
    });

    const handleChange = (field: string, value: string | number) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newPlant = await createPlant(formData);
            if (newPlant) {
                toast.success("Plant added successfully!");
            }
        } catch (error) {
            console.error("Error adding plant:", error);
            toast.error("Failed to add plant. Please try again.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"default"}
                    className="ml-auto flex items-center cursor-pointer"
                >
                    <span className="flex items-center gap-2">
                        <Sprout className="size-4" />
                        Add Plant
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add a Plant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill out form below to add a new plant to your inventory
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Combobox
                                value={formData.category}
                                onChange={(val) =>
                                    handleChange("category", val)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Type your message here."
                            rows={5}
                            value={formData.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="Enter stock quantity"
                                value={formData.stock}
                                onChange={(e) =>
                                    handleChange(
                                        "stock",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={(e) =>
                                    handleChange(
                                        "price",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/*Image Upload*/}
                    {/* <div className="py-5">
                        <ImageUpload
                            endpoint="postImage"
                            value={formData.imageUrl}
                            onChange={(url) => {
                                handleChange("imageUrl", url);
                            }}
                        />
                    </div> */}
                    <h1>Image upload</h1>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Submit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
