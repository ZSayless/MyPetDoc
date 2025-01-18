import React, { useState, useEffect } from "react";
import { homeService } from "../../services/homeService";
import Loading from "../common/Loading";
import ErrorBoundary from "../common/ErrorBoundary";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    featuredHospitals: [],
    latestBlogs: [],
    testimonials: [],
    statistics: null,
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [hospitals, blogs, testimonials, stats] = await Promise.all([
          homeService.getFeaturedHospitals(),
          homeService.getLatestBlogs(),
          homeService.getTestimonials(),
          homeService.getStatistics(),
        ]);

        setData({
          featuredHospitals: hospitals,
          latestBlogs: blogs,
          testimonials: testimonials,
          statistics: stats,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch home data");
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#98E9E9] to-[#7CD5D5] h-[600px]">
          {/* Hero content */}
        </section>

        {/* Featured Hospitals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Hospitals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.featuredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Hospital card content */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Blogs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Latest Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.latestBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Blog card content */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        {data.statistics && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Statistics content */}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  {/* Testimonial content */}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
