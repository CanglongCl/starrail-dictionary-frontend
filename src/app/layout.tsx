import SearchBar from "@/Components/SearchBar";
import { Container, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";

export const metadata: Metadata = {
  title: "Honkai: Star Rail Dictionary",
  description: "Search word for Honkai: Star Rail in all languages. ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
              <a href="https://github.com/CanglongCl/starrail-dictionary">Github</a>
            </Stack>
            <SearchBar />
            {children}
          </Stack>
        </Container>
      </body>
    </html>
  );
}
