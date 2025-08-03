import RichTextEditor from "@/components/rich-text-editor";
import { getMemoById } from "@/server/memos";
import { PageWrapper } from "@/components/page-wrapper";
import { JSONContent } from "@tiptap/react";

type Params = {
    memoId: string;
}

export default async function MemoPage({ params }: { params: Params }) {
    const { memoId } = params;
    const { memo } = await getMemoById(memoId);
    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: memo?.memobook?.name ?? "Memobook", href: `/dashboard/memobook/${memo?.memobook?.id}` }, { label: memo?.title ?? "Memo", href: `/dashboard/memo/${memoId}` }]}>
            <h1>{memo?.title}</h1>
            <RichTextEditor content={memo?.content as JSONContent[]} memoId={memoId} />
        </PageWrapper>
    );
}