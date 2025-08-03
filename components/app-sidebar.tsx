import * as React from "react";

import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getMemobooks } from "@/server/memobooks";
import Image from "next/image";

import Link from "next/link";
import { SidebarData } from "./sidebar-data";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const memobooks = await getMemobooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(memobooks.memobooks?.map((memobook) => ({
        title: memobook.name,
        url: `/dashboard/${memobook.id}`,
        items: memobook.memos.map((memo) => ({
          title: memo.title,
          url: `/dashboard/memobook/${memobook.id}/memo/${memo.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 pl-2">
          <Image src="/memoforge-logo.png" alt="Logo" width={32} height={32} />
          <h2>MemoForge</h2>
        </Link>

        <React.Suspense>
          <SearchForm />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/*  <SidebarData data={data} />
 */}      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}