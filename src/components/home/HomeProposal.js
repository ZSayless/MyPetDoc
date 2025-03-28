import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getHospitals } from "../../services/hospitalService";
import { useTranslation } from "react-i18next";
import Badge2 from "../../assets/img/Badge2.jpg";

function HomeProposal() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await getHospitals();

        const formattedHospitals = response.hospitals
          .filter(
            (hospital) =>
              hospital.is_active === true &&
              !hospital.is_deleted &&
              hospital.proposal === true
          )
          .map((hospital) => ({
            id: hospital.id,
            name: hospital.name,
            image: hospital.images[0]?.url || "",
            rating: hospital.stats?.average_rating || 5,
            location: hospital.address,
            specialties: hospital.specialties
              ? hospital.specialties.split(",").map((s) => s.trim())
              : [],
            reviews: hospital.stats?.total_reviews || 0,
            slug: hospital.slug,
          }));

        // Nhân đôi danh sách để tạo hiệu ứng vô hạn
        setHospitals([...formattedHospitals]);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    let scrollInterval;

    if (autoScroll && hospitals.length > 0) {
      scrollInterval = setInterval(() => {
        if (sliderRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

          // Khi scroll gần đến giữa danh sách
          if (scrollLeft >= scrollWidth / 2 - clientWidth) {
            // Quay lại đầu mượt mà
            sliderRef.current.scrollTo({
              left: 0,
              behavior: "auto", // Thay đổi thành 'auto' để tránh hiệu ứng nhảy
            });
          }

          scroll("right");
        }
      }, 2300); // Giảm thời gian để trượt mượt mà hơn
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [autoScroll, hospitals]);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnter = () => {
    setAutoScroll(false);
  };

  const handleMouseLeave = () => {
    setAutoScroll(true);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("home.proposal.title")}
            </h2>
            <p className="text-gray-600">{t("home.proposal.subtitle")}</p>
          </div>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (hospitals.length === 0) {
    return null; // Không hiển thị section nếu không có bệnh viện proposal
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("home.proposal.title")}
          </h2>
          <p className="text-gray-600">{t("home.proposal.subtitle")}</p>
        </div>

        <div className="relative px-4">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 ${
              !canScrollLeft && "hidden"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={checkScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {hospitals.map((hospital) => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.slug}`}
                className="flex-none w-[260px] bg-white rounded-lg overflow-hidden transform transition-transform hover:scale-105 will-change-transform no-underline"
              >
                <div className="h-full">
                  <div className="relative h-[180px]">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="w-4 h-4 text-green-600 fill-current" />
                      <span className="text-sm font-medium">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <div className="flex items-center gap-1 mt-2 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{hospital.location}</span>
                    </div>

                    {/* Badge position */}
                    <div className="absolute top-2 left-2">
                      <img
                        src={Badge2}
                        alt="Certified Badge"
                        className="w-12 h-12 object-contain"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {hospital.specialties.slice(0, 3).map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      {hospital.reviews} {t("home.proposal.reviews")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 ${
              !canScrollRight && "hidden"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeProposal;
