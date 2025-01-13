import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function AboutUs() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      content:
        "MyPetDoc helped me find the perfect care for my pet. Amazing platform!",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Jane Smith",
      content:
        "The platform is easy to use, and the recommendations were spot on!",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "Robert Johnson",
      content: "Highly recommend MyPetDoc for all pet owners in Vietnam!",
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  const teamMembers = [
    {
      name: "Alice Nguyen",
      role: "Founder",
      description:
        "Alice is passionate about pets and dedicated to connecting pet owners with quality care.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "David Tran",
      role: "Technical Lead",
      description:
        "David ensures the platform runs smoothly and stays updated with the latest technology.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Sarah Le",
      role: "Marketing Specialist",
      description:
        "Sarah helps spread the word about MyPetDoc's mission to help pets across Vietnam.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      name: "Sarah Le",
      role: "Marketing Specialist",
      description:
        "Sarah helps spread the word about MyPetDoc's mission to help pets across Vietnam.",
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section
        className=" py-16 px-4 relative bg-[url('https://bizmap.dexignzone.com/react/demo/static/media/bnr1.fc9916a8.jpg')] 
        bg-cover bg-center bg-no-repeat h-[300px] md:h-[400px] flex flex-col items-center justify-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/60"
      >
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Welcome to MyPetDoc
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Your trusted platform for finding the best pet hospitals in Vietnam,
            ensuring quality care for your beloved pets.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              About Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  MyPetDoc is committed to revolutionizing pet healthcare in
                  Vietnam. Our platform connects pet owners with trusted
                  veterinary facilities, ensuring your pets receive the best
                  possible care.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We understand that pets are family, and their health is our
                  top priority. Through our extensive network of verified pet
                  hospitals, we make it easier for pet owners to find reliable
                  healthcare services.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2"
                  alt="Pet care"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Team
          </h2>
          <div className="relative px-12">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-gray-50 rounded-xl p-6 transition-transform hover:scale-105 cursor-pointer">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-6"
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4 text-center">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-center">
                      {member.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#4611a7] text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none z-10"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#4611a7] text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none z-10"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Testimonials
          </h2>
          <div className="max-w-4xl mx-auto">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Find the Best Care for Your Pet?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Start exploring our network of trusted pet hospitals today.
          </p>
          <Link
            to=""
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold 
                     hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
export default AboutUs;
