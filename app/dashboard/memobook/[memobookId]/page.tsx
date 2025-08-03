import { CreateMemoButton } from "@/components/create-memo-button";
import MemoCard from "@/components/memo-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getMemobookById } from "@/server/memobooks";

type Params = {
    memobookId: string;
}

export default async function MemobookPage({ params }: { params: Params }) {
    const { memobookId } = params;
    const { memobook } = await getMemobookById(memobookId);
    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: memobook?.name ?? "Memo", href: `/dashboard/memobook/${memobookId}` }]}>
            <h1>{memobook?.name}</h1>
            <CreateMemoButton memobookId={memobookId} />
            <div>
                {memobook?.memos?.map((memo) => (
                    <MemoCard key={memo.id} memo={memo} />
                ))}
            </div>
        </PageWrapper>
    );
}