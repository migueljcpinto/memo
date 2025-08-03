"use client"

import { Memo } from "@/db/schema";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/dist/client/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { deleteMemo } from "@/server/memos";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog"

interface MemoCardProps {
    memo: Memo
}

export default function MemoCard({ memo }: MemoCardProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteMemo(memo.id);
            if (response.success) {
                toast.success("Memo deleted successfully");
                router.refresh();
            }
        } catch {
            toast.error("Failed to delete memo");
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{memo.title}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="justify-end flex gap-2">
                <Link href={`/dashboard/memobook/${memo.memobookId}/memo/${memo.id}`}>
                    <Button variant="outline">View</Button>
                </Link>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 className="size-4" />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your memo and remove all its memos.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>
    )
}