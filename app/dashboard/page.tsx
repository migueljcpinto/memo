import { CreateMemobookButton } from "@/components/create-memobook-button";
import MemoBookCard from "@/components/memobook-card";
import { PageWrapper } from "@/components/page-wrapper";
import { getMemobooks } from "@/server/memobooks";

export default async function Page() {
    const memobooks = await getMemobooks();
    console.log("Memobooks:", memobooks);
    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
            <h1>Memobooks</h1>

            <CreateMemobookButton />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {memobooks.success ?
                    memobooks?.memobooks?.map((memobook) => (
                        <MemoBookCard key={memobook.id} memobook={memobook} />
                    ))
                    : (
                        <div>No memobooks found</div>
                    )}
            </div>
        </PageWrapper>
    );
}