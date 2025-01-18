import { useEffect, useCallback } from "react";

export function useInfiniteScroll(callback, deps = []) {
  const handleScroll = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,I
    });

    const element = document.getElementById("infinite-scroll-trigger");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [handleScroll, ...deps]);
}
