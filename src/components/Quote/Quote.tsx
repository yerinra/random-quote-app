import { useEffect, useState } from "react";
import styles from "./Quote.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import Error from "../Error";
import Loading from "../Loading";
import CategoryButtons from "../CategoryButtons";

export type cat = { quote: string; author: string; category: string };
type data = cat[];
const NET_NINJA_API_KEY: string = "N1a3RCQJHruClOQ78owVbw==R5nDvK4ISKhCjAQA";
const categoryList: string[] = [
  "alone",
  "attitude",
  "change",
  "courage",
  "dreams",
  "education",
  "experience",
  "failure",
  "faith",
  "forgiveness",
  "freedom",
  "friendship",
  "future",
  "imagination",
  "inspirational",
  "learning",
  "life",
  "love",
  "morning",
  "success",
];

const Quote = () => {
  const [category, setCategory] = useState<string>("love");

  const getQuotes: () => Promise<data> = async () => {
    const result = await axios
      .get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { "x-api-key": NET_NINJA_API_KEY },
      })
      .then((res) => {
        return res.data;
      });

    // const result = await fetch("/staticApi/withCategory.json").then((res) =>
    //   res.json()
    // );
    return result;
  };

  const {
    data: quoteData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuotes,
    staleTime: 1000 * 5 * 60,
  });
  useEffect(() => {
    refetch();
  }, [category]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target! as HTMLElement;
    setCategory(eventTarget.innerText);
  };

  return (
    <section className="flex flex-col gap-3 p-5 w-screen h-screen font-sans justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">QUOTES!</h1>

        {error && <Error />}
        {isLoading && <Loading />}

        {quoteData && quoteData.length !== 0 && (
          <section className="mt-10 flex flex-col gap-3">
            <div className="badge badge-primary ml-1">
              {quoteData[0].category}
            </div>
            <h2 className="text-4xl font-bold leading-snug text-primary">
              {quoteData[0].quote}
            </h2>
            <h3 className="italic text-xl ml-auto mr-10">
              {"- " + quoteData[0].author}
            </h3>
          </section>
        )}
      </div>
      <section className="grid grid-cols-7 gap-3">
        {categoryList.map((category) => (
          <CategoryButtons
            key={category}
            category={category}
            handleClick={handleClick}
          />
        ))}
      </section>
    </section>
  );
};

export default Quote;
