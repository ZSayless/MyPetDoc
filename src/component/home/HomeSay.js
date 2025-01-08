import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSay = () => {
  const testimonials = [
    {
      id: 1,
      name: "Diamond Anderson",
      role: "Founder, uihub inc.",
      image:
        "data:image/jpeg;base64,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",
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      id: 2,
      name: "Diamond Anderson",
      role: "Founder, uihub inc.",
      image:
        "data:image/jpeg;base64,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",
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      id: 3,
      name: "Diamond Anderson",
      role: "Founder, uihub inc.",
      image:
        "data:image/jpeg;base64,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",
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 bg-[#f7f7f7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#0c0e1a]">
            What Our Users Say
          </h2>
          <div className="inline-block w-[50px] h-[3px] mb-[10px] bg-[#4611a7]"></div>
          <p className="text-[#606269] max-w-2xl mx-auto text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
        </div>

        <Slider {...settings} className="testimonial-slider -mx-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#0c0e1a]">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#4611a7]">{testimonial.role}</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-[#0c0e1a]">
                  {testimonial.quote}
                </h4>
                <p className="text-[#606269]">{testimonial.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSay;
