import React from "react";
import { Search, Calendar, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#1A3C8E] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Tìm Bệnh Viện Thú Y Gần Bạn</h1>
            <p className="text-xl text-white/80 mb-8">
              Kết nối với các bệnh viện thú y uy tín hàng đầu tại Việt Nam
            </p>
            {/* Search Bar */}
            <div className="flex items-center gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Nhập tên bệnh viện hoặc địa chỉ..."
                  className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <Link
                to="/find-hospital"
                className="bg-[#98E9E9] text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors whitespace-nowrap"
              >
                Tìm Kiếm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tìm Kiếm Dễ Dàng</h3>
              <p className="text-gray-600">
                Tìm bệnh viện thú y gần bạn với bộ lọc thông minh theo vị trí và dịch vụ
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đặt Lịch Trực Tuyến</h3>
              <p className="text-gray-600">
                Đặt lịch khám cho thú cưng nhanh chóng, theo dõi lịch hẹn dễ dàng
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đánh Giá & Nhận Xét</h3>
              <p className="text-gray-600">
                Xem đánh giá thực tế từ khách hàng để chọn dịch vụ phù hợp nhất
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Hospitals Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Bệnh Viện Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hospital Card */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"
                alt="Hospital"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">PetPro Veterinary Hospital</h3>
                <p className="text-gray-600 mb-4">Quận 7, TP.HCM</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-2 text-gray-600">4.8 (234 đánh giá)</span>
                  </div>
                  <Link
                    to="/hospital/1"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* More hospital cards... */}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Bạn là Chủ Bệnh Viện Thú Y?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Đăng ký để tiếp cận hàng nghìn khách hàng tiềm năng và quản lý dịch vụ của bạn
            </p>
            <Link
              to="/register"
              className="inline-block bg-[#98E9E9] text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-[#7CD5D5] transition-colors"
            >
              Đăng Ký Ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
