import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Home() {
  const featuredHospitals = [
    {
      id: 1,
      name: "PetCare Hospital",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      description: "State-of-the-art veterinary care facility",
      rating: 4.8,
      reviews: 128
    },
    // Thêm các bệnh viện khác
  ];

  const featuredBlogs = [
    {
      id: 1,
      title: "Essential Pet Care Tips",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
      author: "Dr. Smith",
      date: "2024-03-15"
    },
    // Thêm các blog khác
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1587764379873-97837921fd44"
          alt="Hero"
          effect="blur"
          className="w-full h-[600px] object-cover"
          placeholderSrc="/placeholder-hero.jpg"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to MyPetDoc</h1>
            <p className="text-xl mb-8">Find the best care for your furry friends</p>
            <Link
              to="/hospitals"
              className="bg-[#98E9E9] text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-[#7CD5D5] transition-colors"
            >
              Find a Hospital
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Hospitals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHospitals.map(hospital => (
              <div key={hospital.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <LazyLoadImage
                  src={hospital.image}
                  alt={hospital.name}
                  effect="blur"
                  className="w-full h-48 object-cover"
                  placeholderSrc="/placeholder-hospital.jpg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 mb-4">{hospital.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{hospital.rating}</span>
                      <span className="text-gray-500 ml-2">({hospital.reviews} reviews)</span>
                    </div>
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <LazyLoadImage
                  src={blog.image}
                  alt={blog.title}
                  effect="blur"
                  className="w-full h-48 object-cover"
                  placeholderSrc="/placeholder-blog.jpg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{blog.author}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.date}</span>
                  </div>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/blogs"
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
