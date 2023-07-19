import ItemCards from "@/Components/DictionaryItemCard";

export default function Page({ params }: { params: { searchWord: string } }) {
  const { searchWord } = params;

  const SearchCard = () => {
    if (typeof searchWord === "string") {
      return <ItemCards searchWord={searchWord} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <SearchCard />
    </>
  );
}
