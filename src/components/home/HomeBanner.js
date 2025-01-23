import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getActiveBanners } from "../../services/homeService";
import { useEffect, useState } from "react";

function HomeBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    try {
      getActiveBanners().then((data) => {
        setBanners(data);
      });
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  }, []);

  if (banners.length === 0) {
    return null; // Hoặc có thể return một loading spinner
  }

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
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <h3 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                    {banner.subtitle}
                  </h3>
                )}
                <p className="text-xl md:text-2xl text-center">
                  {banner.description}
                </p>
                {banner.link && (
                  <a
                    href={banner.link}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Xem thêm
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
