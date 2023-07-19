export const runtime = 'edge';

import ItemCards from "@/Components/DictionaryItemCard";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { searchWord: string };
}) {
  const { searchWord } = params;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ItemCards searchWord={searchWord} />
    </Suspense>
  );
}
