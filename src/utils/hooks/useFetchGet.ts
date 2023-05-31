import { useEffect, useState } from "react";
import { MovieType } from "../types/movie";

export function useFetchGet(url: string) {
  const [data, setData] = useState<MovieType>({});
}

useEffect(() => {
  return () => {};
}, []);
