import React from "react";
import { Star } from "lucide-react";

  const teamMembers = [
    {
      name: "Alice Nguyen",
      role: "Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "With over 15 years of experience in veterinary medicine",
  },
  {
    name: "David Wilson",
    role: "Lead Veterinarian",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Specialized in small animal medicine and surgery",
  },
  {
    name: "Sarah Chen",
    role: "Animal Behaviorist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    bio: "Expert in pet behavior and training techniques",
  },
];

const reviews = [
  {
    id: 1,
    name: "John Smith",
    rating: 5,
    comment: "Excellent service and caring staff!",
    date: "March 15, 2024",
  },
  {
    id: 2,
    name: "Emily Brown",
    rating: 5,
    comment: "Very professional and knowledgeable team.",
    date: "March 14, 2024",
  },
  {
    id: 3,
    name: "Michael Lee",
    rating: 4,
    comment: "Great experience overall, highly recommend!",
    date: "March 13, 2024",
  },
];

function AboutUs() {
  return (
    <div className="min-h-screen pt-[50px]">
      {/* Hero Section */}
      <section
        className="py-16 px-4 relative bg-[url('https://bizmap.dexignzone.com/react/demo/static/media/bnr1.fc9916a8.jpg')] 
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
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
              Founded in 2024, MyPetDoc has been dedicated to connecting pet owners
              with quality veterinary care across Vietnam. Our platform makes it
              easy to find, review, and book appointments with trusted pet
              hospitals.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                    <img
                      src={member.image}
                      alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
                  </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                      </div>
                    </div>
                <p className="text-gray-600 mb-4">{review.comment}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
