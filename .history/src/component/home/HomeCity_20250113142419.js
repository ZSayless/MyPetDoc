function HomeCity() {
  const topCities = [
    {
      name: "TP. Hồ Chí Minh",
      count: "50+ bệnh viện",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3"
    },
    {
      name: "Hà Nội",
      count: "40+ bệnh viện",
      image: "https://images.unsplash.com/photo-1599708153386-62bf3f6c49a6?ixlib=rb-4.0.3"
    },
    {
      name: "Đà Nẵng",
      count: "20+ bệnh viện",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Các Thành Phố Lớn</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topCities.map((city, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden h-[200px] group">
            <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
              <p>{city.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCity;
