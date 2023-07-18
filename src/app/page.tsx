"use client";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
  Card,
  Container,
  Box,
  CardContent,
  Button,
  CardActions,
  Typography,
  Stack,
} from "@mui/material";
import * as React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";

type SearchResultItem = {
  vocabulary_id: number;
  target: string;
  target_lang: string;
  lan_dict: { [lang: string]: string };
};

export default function Home() {
  const [searchWord, setSearchWord] = useState("");
  const [searchResultItems, setSearchResultItems] =
    useState<Array<SearchResultItem> | null>(null);
  const [error, setError] = useState(null);

  function handelSearch() {
    console.log(searchWord);
    fetch(`/api/search?search_word=${searchWord}&batch_size=${10}&page=${0}`)
      .then((response) => response.json())
      .then((data: Array<SearchResultItem>) => {
        console.log(data);
        setSearchResultItems(data);
      })
      .catch((error) => setError(error));
  }

  function ItemCards() {
    if (searchResultItems == null) {
      return null;
    } else if (searchResultItems.length != 0) {
      return (
        <Stack direction="column" spacing={2}>
          {searchResultItems.map((item) => (
            <DictionaryItemCard item={item} key={item.vocabulary_id} />
          ))}
        </Stack>
      );
    } else if (searchResultItems.length == 0) {
      return <p>No word found. </p>;
    } else if (error != null) {
      return <p>error</p>;
    } else {
      return <p>Please search first. </p>;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handelSearch();
    }
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          justifyContent="space-between"
        >
          <Typography variant="h3" component="div">
            {"Honkai: Star Rail Dictionary"}
          </Typography>
          <a href="https://github.com/CanglongCl/starrail-dictionary">
            <GitHubIcon fontSize="large" />
          </a>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            onChange={(event) => setSearchWord(event.target.value)}
            value={searchWord}
            onKeyDown={handleKeyDown}
          />
          <IconButton sx={{ p: "5px" }} onClick={handelSearch}>
            <SearchIcon />
          </IconButton>
        </Stack>
        <ItemCards />
      </Stack>
    </Container>
  );
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
