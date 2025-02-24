import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Xử lý scroll to top khi chuyển trang
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  // Xử lý hiển thị nút scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-[24px] w-[44px] h-[44px] flex items-center justify-center bg-[#98E9E9] hover:bg-[#7CD5D5] rounded-full shadow-lg transition-all duration-300 z-[1000] p-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
