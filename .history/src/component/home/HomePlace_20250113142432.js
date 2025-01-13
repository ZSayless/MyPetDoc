import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePlace = () => {
  const topHospitals = [
    {
      name: "Pet Care International",
      location: "Quận 1, TP.HCM",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3"
    },
    {
      name: "Thú Y Sài Gòn",
      location: "Quận 7, TP.HCM",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3"
    },
    {
      name: "Pet Health Center",
      location: "Quận 3, TP.HCM",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3"
    },
    {
      name: "Animal Care Hospital",
      location: "Quận 2, TP.HCM",
      rating: 4.6,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Bệnh Viện Nổi Bật</h2>
          <button className="text-[#98E9E9] hover:text-[#7CD5D5] font-medium">
            Xem tất cả
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topHospitals.map((hospital, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{hospital.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hospital.location}</p>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400">
                    <span className="text-sm font-medium mr-1">{hospital.rating}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    ({hospital.reviews} đánh giá)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePlace;
