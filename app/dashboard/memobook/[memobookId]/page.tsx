import { CreateMemoButton } from "@/components/create-memo-button";
import MemoCard from "@/components/memo-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getMemobookById } from "@/server/memobooks";

type Params = Promise<{
    memobookId: string;
}>;

export default async function MemobookPage({ params }: { params: Params }) {
    const { memobookId } = await params;

    const { memobook } = await getMemobookById(memobookId);

    return (
        <PageWrapper
            breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                {
                    label: memobook?.name ?? "Memobook",
                    href: `/dashboard/memobook/${memobookId}`,
                },
            ]}
        >
            <h1>{memobook?.name}</h1>

            <CreateMemoButton memobookId={memobookId} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {memobook?.memos?.map((memo) => (
                    <MemoCard key={memo.id} memo={memo} />
                ))}
            </div>
        </PageWrapper>
    );
}