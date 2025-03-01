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
    window.open(url, '_blank', 'noopener,noreferrer');
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
        <p className="text-gray-600">Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
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
                 <button
                    onClick={() => handleLinkClick(banner.link)}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Xem thêm
                  </button>
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
