import { useEffect } from "react";

function useSitePageBoot(title) {
  useEffect(() => {
    document.title = title;

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [title]);
}

export default useSitePageBoot;
