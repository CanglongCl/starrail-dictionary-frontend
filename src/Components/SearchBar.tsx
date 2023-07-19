"use client";

import {
  Stack,
  TextField,
  IconButton,
  Button,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function SearchBar() {
  const params = useParams();
  const initSearchWord =
    typeof params["searchWord"] === "string"
      ? decodeURI(params["searchWord"])
      : "";
  const [searchWord, setSearchWord] = useState(initSearchWord);

  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${searchWord}`);
  };

  return (
    <form onSubmit={handleSearch}>
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
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </Stack>
    </form>
  );
}
