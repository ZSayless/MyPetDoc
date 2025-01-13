import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HomeBanner() {
  const bannerSlides = [
    {
      image: "https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143920.jpg",
      title: "Tìm Bệnh Viện Thú Y Uy Tín",
      description: "Kết nối với các bệnh viện thú y hàng đầu tại Việt Nam"
    },
    {
      image: "https://img.freepik.com/free-photo/front-view-veterinarian-taking-care-pet_23-2149143894.jpg", 
      title: "Đội Ngũ Bác Sĩ Chuyên Nghiệp",
      description: "Chăm sóc sức khỏe thú cưng với các bác sĩ giàu kinh nghiệm"
    },
    {
      image: "https://img.freepik.com/free-photo/young-female-veterinarian-holding-cat-vet-clinic_23-2147844243.jpg",
      title: "Dịch Vụ Y Tế Toàn Diện",
      description: "Khám chữa bệnh, tiêm phòng và chăm sóc sức khỏe thú cưng 24/7"
    },
    {
      image: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143899.jpg",
      title: "Đặt Lịch Khám Dễ Dàng",
      description: "Đặt lịch khám trực tuyến nhanh chóng và tiện lợi"
    }
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
                <p className="text-xl md:text-2xl text-center max-w-3xl px-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
