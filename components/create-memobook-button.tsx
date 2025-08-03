"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createMemobook } from "@/server/memobooks";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2).max(50),
});

export const CreateMemobookButton = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const userId = (await authClient.getSession()).data?.user.id;

            if (!userId) {
                toast.error("You must be logged in to create a memobook");
                return;
            }

            const response = await createMemobook({
                ...values,
                userId,
            });
            if (response.success) {
                form.reset();
                toast.success("Memobook created successfully");
                router.refresh();
                setIsOpen(false);
            } else {
                toast.error(response.message);
            }
        } catch {
            toast.error("Failed to create memobook");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-max">Create Memobook</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Memobook</DialogTitle>
                    <DialogDescription>
                        Create a new memobook to store your memos.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Memobook" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};