import React from 'react';
import { Link } from 'react-router-dom';

function Community() {
  // Mock data for gallery
  const galleryImages = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      caption: "Happy dog at the park",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
      caption: "Cute cat playing",
      likes: 18,
      comments: 3
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
      caption: "Pet family photo",
      likes: 32,
      comments: 7
    }
  ];

  // Mock data for news/features
  const newsItems = [
    {
      id: 1,
      title: "New Pet Hospital Opens in Ho Chi Minh City",
      excerpt: "State-of-the-art facility brings advanced veterinary care to District 1",
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "Pet Vaccination Drive This Weekend",
      excerpt: "Free vaccinations available at participating clinics",
      date: "2024-03-14"
    },
    {
      id: 3,
      title: "Tips for Summer Pet Care",
      excerpt: "Keep your pets safe and comfortable during hot weather",
      date: "2024-03-13"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Pet Community</h1>
          <p className="text-xl text-white/90 mb-8">
            Connect with fellow pet lovers, share experiences, and stay updated with the latest pet care news
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Pet Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={image.imageUrl} 
                  alt={image.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{image.caption}</p>
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>❤️ {image.likes}</span>
                      <span>💬 {image.comments}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Upload Your Photo
            </button>
          </div>
        </div>
      </section>

      {/* News/Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link to="" className="text-blue-600 hover:text-blue-700 font-medium">
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of a growing network of pet lovers and professionals
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Sign Up Now
            </button>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Community; 