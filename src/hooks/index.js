import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

export const useInfiniteScroll = hasMore => {
  const PAGE_INCREMENT = 1;
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(PAGE_INCREMENT + 1);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return false;
    }

    setLoading(true);
  }, 300);

  useEffect(() => {
    if (!loading) return;
    hasMore && setCount(count + PAGE_INCREMENT);
    setLoading(false);
  }, [count, loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return { count, loading };
};
