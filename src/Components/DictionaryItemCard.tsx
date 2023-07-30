import { Card, CardContent, Stack, Typography } from "@mui/material";
import error from "next/error";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function handelSearch(searchWord: string): Promise<SearchResult> {
  const data = await fetch(
    `https://hsrdict-api.pizzastudio.org/v1/translations/${searchWord}?page=${1}&page_size=${10}`
  );
  const obj = await data.json();
  return obj;
}

type SearchResult = {
  total: number;
  page: number;
  page_size: number;
  translations: Array<SearchResultItem>;
};

type SearchResultItem = {
  vocabulary_id: number;
  target: string;
  target_lang: string;
  lan_dict: { [lang: string]: string };
};

export default async function ItemCards({
  searchWord,
}: {
  searchWord: string;
}) {
  const { total, page, page_size, translations } = await handelSearch(
    searchWord
  );

  if (translations.length != 0) {
    return (
      <Stack direction="column" spacing={2}>
        {translations.map((item) => (
          <DictionaryItemCard item={item} key={item.vocabulary_id} />
        ))}
      </Stack>
    );
  } else {
    notFound();
  }
}

function DictionaryItemCard({ item }: { item: SearchResultItem }) {
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            display: "flex",
            alignItems: "center",
          }}
          gutterBottom
        >
          <span>{item.target_lang}</span>
          <span color="grey">{item.vocabulary_id}</span>
        </Typography>
        <Typography variant="h5" component="div">
          {item.target}
        </Typography>
        {Object.entries(item.lan_dict).map(([lang, dict]) => (
          <Typography
            key={lang}
            variant="body2"
            color="text.primary"
            sx={{ textAlign: "left" }}
          >
            {lang}: {dict}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
