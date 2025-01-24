import {
  Star,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getHospitals } from "../../services/hospitalService";
import { useTranslation } from "react-i18next";

function HomePlace() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await getHospitals();

        // Kiểm tra và format dữ liệu
        const formattedHospitals = response.hospitals.map((hospital) => ({
          id: hospital.id,
          name: hospital.name,
          image: hospital.images[0]?.url || "", // Lấy ảnh đầu tiên
          rating: hospital.average_rating || 5,
          location: hospital.address,
          specialties: hospital.specialties
            ? hospital.specialties.split(",").map((s) => s.trim())
            : [],
          reviews: hospital.review_count || 0,
          slug: hospital.slug,
        }));

        setHospitals(formattedHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

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

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("home.places.title")}
            </h2>
            <p className="text-gray-600">{t("home.places.subtitle")}</p>
          </div>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("home.places.title")}
          </h2>
          <p className="text-gray-600">{t("home.places.subtitle")}</p>
        </div>

        <div className="relative px-4">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={checkScroll}
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

                    <div className="flex flex-wrap gap-1 mt-3">
                      {hospital.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600"
                        >
                          {specialty.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      {hospital.reviews} đánh giá đã xác minh
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomePlace;
