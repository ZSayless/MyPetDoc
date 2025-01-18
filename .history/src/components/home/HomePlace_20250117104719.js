import {
  Star,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function HomePlace() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navigate = useNavigate();

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

  const topHospitals = [
    {
      id: 1,
      name: "Pet Care International",
      location: "District 1, HCMC",
      rating: 4.8,
      reviews: 234,
      specialties: ["Surgery", "Vaccination", "Emergency"],
      image:
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Saigon Pet Hospital",
      location: "District 7, HCMC",
      rating: 4.7,
      reviews: 189,
      specialties: ["Dentistry", "Internal Medicine"],
      image:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Pet Health Center",
      location: "District 3, HCMC",
      rating: 4.9,
      reviews: 156,
      specialties: ["Cardiology", "Neurology"],
      image:
        "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Animal Care Hospital",
      location: "District 2, HCMC",
      rating: 4.6,
      reviews: 145,
      specialties: ["Orthopedics", "Rehabilitation"],
      image:
        "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3",
    },
    {
      id: 5,
      name: "VetCare Clinic",
      location: "District 5, HCMC",
      rating: 4.5,
      reviews: 178,
      specialties: ["Surgery", "Pet Grooming"],
      image:
        "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3",
    },
    {
      id: 6,
      name: "PawSome Pet Hospital",
      location: "District 4, HCMC",
      rating: 4.7,
      reviews: 167,
      specialties: ["Emergency", "Vaccination"],
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
    },
    {
      id: 7,
      name: "Happy Tails Clinic",
      location: "District 8, HCMC",
      rating: 4.8,
      reviews: 198,
      specialties: ["Dentistry", "Surgery"],
      image:
        "https://images.unsplash.com/photo-1612531822963-5574e6d310e5?ixlib=rb-4.0.3",
    },
    {
      id: 8,
      name: "Pet Wellness Center",
      location: "District 10, HCMC",
      rating: 4.4,
      reviews: 134,
      specialties: ["Internal Medicine", "Nutrition"],
      image:
        "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-4.0.3",
    },
  ];

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
            {topHospitals.map((hospital) => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.id}`}
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
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      {hospital.reviews} {t("home.places.reviews")}
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
