import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

function HomeBanner() {
  const { t } = useTranslation();

  const bannerSlides = [
    {
      image:
        "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143920.jpg",
      title: t("home.hero.title"),
      description: t("home.hero.subtitle"),
      button: {
        text: t("home.hero.findButton"),
        link: "/find-hospital",
      },
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-veterinarian-taking-care-pet_23-2149143894.jpg",
      title: "Expert Veterinarians",
      description: "Experienced doctors dedicated to pet health",
      button: {
        text: "Join Community",
        link: "",
      },
    },
    {
      image:
        "https://img.freepik.com/free-photo/young-female-veterinarian-holding-cat-vet-clinic_23-2147844243.jpg",
      title: "Modern Facilities",
      description: "State-of-the-art equipment for the best care",
      button: {
        text: "List Your Hospital",
        link: "",
      },
    },
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[500px]"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-center mb-8">
                  {slide.description}
                </p>

                {/* Single Action Button - Consistent Style */}
                <Link
                  to={slide.button.link}
                  className="px-8 py-3 bg-[#98E9E9] text-gray-900 rounded-full font-medium hover:bg-[#7CD5D5] transition-colors shadow-lg"
                >
                  {slide.button.text}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
