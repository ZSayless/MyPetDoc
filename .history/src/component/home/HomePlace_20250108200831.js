import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePlace = () => {
  const places = [
    {
      id: 1,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic5.e54217a0.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 2,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic6.ee849428.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 3,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic1.5c66f3f1.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 4,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic2.42911ffc.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 5,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic3.8b3fb00e.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 6,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic5.e54217a0.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 7,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic6.ee849428.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 8,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic5.e54217a0.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 9,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic6.ee849428.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 10,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic1.5c66f3f1.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 11,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic2.42911ffc.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 12,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic3.8b3fb00e.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 13,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic5.e54217a0.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
    {
      id: 14,
      name: "King Organic Shop",
      image:
        "https://bizmap.dexignzone.com/react/demo/static/media/pic6.ee849428.jpg",
      rating: 5,
      address: "12/a, New",
      status: "Open Now",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.",
    },
  ];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4611a7] w-10 h-10 flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4611a7] text-white w-10 h-10 flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 bg-[#f5f2ff]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#0c0e1a]">
            Top Trending Places
          </h2>
          <div className="inline-block w-[50px] h-[3px] mb-[10px] bg-[#4611a7]"></div>
          <p className="text-[#606269] max-w-2xl mx-auto text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
        </div>

        <div className="relative px-12">
          <Slider {...settings}>
            {places.map((place) => (
              <div key={place.id} className="px-3">
                <div className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-[#ccc] p-2 rounded-full shadow-md">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(place.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#0c0e1a]">
                      {place.name}
                    </h3>
                    <p className="text-[#606269] mb-4">{place.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-[#606269]">
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
                        {place.address}
                      </span>
                      <span className="text-green-500">{place.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePlace;
