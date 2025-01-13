import React from 'react';

function Community() {
  const posts = [
    {
      id: 1,
      title: "Tips for New Pet Owners",
      author: "Dr. Nguyen Van A",
      date: "2024-03-15",
      content: "Here are some essential tips for new pet owners...",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
    },
    {
      id: 2,
      title: "Pet Healthcare Basics",
      author: "Dr. Tran Thi B",
      date: "2024-03-14",
      content: "Understanding basic pet healthcare is crucial...",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Pet Community
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect with other pet owners and share your experiences
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <div className="text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-gray-600">
                  {post.content}
                </p>
                <div className="mt-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Post Button */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Create New Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community; 