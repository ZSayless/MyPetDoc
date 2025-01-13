const HomeCity = () => {
  const cities = [
    {
      name: "London",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic2.cc897a7c.jpg",
      rating: 5,
      citiesCount: 12,
      listingCount: "30+",
    },
    {
      name: "United States",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic3.673044d2.jpg",
      rating: 5,
      citiesCount: 12,
      listingCount: "30+",
    },
    {
      name: "Korea",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic4.41510cc3.jpg",
      rating: 5,
      citiesCount: 12,
      listingCount: "30+",
    },
    {
      name: "Japan",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic5.270d02a1.jpg",
      rating: 5,
      citiesCount: 12,
      listingCount: "30+",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#0c0e1a] ">
          Popular Cities
        </h2>
        <div className="inline-block w-[50px] h-[3px] mb-[10px] bg-[#4611a7]"></div>
        <p className="text-[#606269] max-w-2xl mx-auto text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="relative group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="flex items-center mb-2">
                {[...Array(city.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2">{city.name}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {city.citiesCount} Cities
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {city.listingCount} Listing
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCity;
