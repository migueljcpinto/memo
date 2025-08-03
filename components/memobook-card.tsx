"use client"

import { Memobook } from "@/db/schema";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/dist/client/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { deleteMemobook } from "@/server/memobooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MemoBookCardProps {
    memobook: Memobook
}

export default function MemoBookCard({ memobook }: MemoBookCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteMemobook(memobook.id);
            if (response.success) {
                toast.success("Memobook deleted successfully");
                router.refresh();
            }
        } catch {
            toast.error("Failed to delete memobook");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{memobook.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{memobook.memos?.length ?? 0} memos</p>
            </CardContent>
            <CardFooter className="justify-end flex gap-2">
                <Link href={`/dashboard/memobook/${memobook.id}`}>
                    <Button variant="outline">View</Button>
                </Link>
                <Button onClick={handleDelete} variant="destructive" size="icon" disabled={isDeleting}>
                    {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 className="size-4" />}
                </Button>
            </CardFooter>
        </Card>
    )
}