import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getActiveBanners } from "../../services/homeService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function HomeBanner() {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(false);

  const handleLinkClick = (link) => {
    if (!link) return;

    // Kiểm tra xem link có protocol chưa
    const hasProtocol = /^https?:\/\//i.test(link);
    const url = hasProtocol ? link : `https://${link}`;

    // Mở link trong tab mới
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getActiveBanners();
        setBanners(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setError(true);
      }
    };

    fetchBanners();
  }, []);

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">
          Không thể tải dữ liệu. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
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
        className="h-[300px] sm:h-[400px] md:h-[500px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <h3 className="text-base sm:text-xl md:text-2xl font-medium mb-2 text-white/90">
                      {banner.subtitle}
                    </h3>
                  )}
                  <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto">
                    {banner.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
