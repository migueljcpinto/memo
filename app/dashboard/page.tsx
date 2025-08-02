import { PageWrapper } from "@/components/page-wrapper";
import { getMemobooks } from "@/server/memobooks";

export default async function Page() {
    const memobooks = await getMemobooks();

    return (
        <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
            <h1>Memobooks</h1>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {memobooks.success &&
                    memobooks?.memobooks?.map((memobook) => (
                        <div key={memobook.id} className="p-4 border rounded-lg">
                            <h2 className="text-lg font-semibold">{memobook.name}</h2>
                            <p className="text-sm text-gray-600">{memobook.memos}</p>
                            <p className="text-xs text-gray-400">
                                Created on: {new Date(memobook.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
            </div>

            {memobooks.success && memobooks?.memobooks?.length === 0 && (
                <div>No memobooks found</div>
            )}
        </PageWrapper>
    );
}