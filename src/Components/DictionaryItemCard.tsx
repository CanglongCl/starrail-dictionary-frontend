import { Card, CardContent, Stack, Typography } from "@mui/material";
import error from "next/error";
import { use } from "react";

async function handelSearch(searchWord: string): Promise<Array<SearchResultItem>> {
  const data = await fetch(`http://hsrdict.pizzastudio.org/api/search?search_word=${searchWord}&batch_size=${10}&page=${0}`);
  const obj = await data.json();
  return obj;
}

type SearchResultItem = {
  vocabulary_id: number;
  target: string;
  target_lang: string;
  lan_dict: { [lang: string]: string };
};

export default function ItemCards({searchWord}: {searchWord: string}) {
  const searchResultItems = use(handelSearch(searchWord));

  if (searchResultItems.length != 0) {
    return (
      <Stack direction="column" spacing={2}>
        {searchResultItems.map((item) => (
          <DictionaryItemCard item={item} key={item.vocabulary_id} />
        ))}
      </Stack>
    );
  } else {
    return <p>No word found. </p>;
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
