import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { FaFacebook, FaGoogle, FaEdit } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Profile() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    joinDate: "March 2024",
    totalReviews: 15,
    favoriteHospitals: 8
  });

  const [reviews] = useState([
    {
      id: 1,
      hospitalName: "Pet Care Center",
      rating: 4.5,
      comment: "Great service and friendly staff",
      date: "2024-03-15"
    },
    {
      id: 2,
      hospitalName: "Animal Hospital",
      rating: 5,
      comment: "Excellent facilities and professional care",
      date: "2024-03-10"
    }
  ]);

  const [favorites] = useState([
    {
      id: 1,
      name: "Pet Care Center",
      thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: 2,
      name: "Animal Hospital",
      thumbnail: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    }
  ]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-32">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 bg-gray-100 rounded-full">
                      <span className="text-sm text-gray-600">Joined {user.joinDate}</span>
                    </div>
                    <div className="px-4 py-2 bg-gray-100 rounded-full">
                      <span className="text-sm text-gray-600">{user.totalReviews} Reviews</span>
                    </div>
                    <div className="px-4 py-2 bg-gray-100 rounded-full">
                      <span className="text-sm text-gray-600">{user.favoriteHospitals} Favorites</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {['Profile', 'Security', 'Reviews', 'Favorites'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8">
            {/* Profile Tab */}
            <Tab.Panel>
              <div data-aos="fade-up" className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Account Information</h3>
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Security Tab */}
            <Tab.Panel>
              <div data-aos="fade-up" className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-8">
                  {/* Change Password Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                    <form className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                          type="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>

                  {/* Connected Accounts */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Connected Accounts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaFacebook className="w-6 h-6 text-blue-600" />
                          <span className="font-medium">Facebook</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Connect</button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaGoogle className="w-6 h-6 text-red-600" />
                          <span className="font-medium">Google</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Connect</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Reviews Tab */}
            <Tab.Panel>
              <div data-aos="fade-up" className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{review.hospitalName}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(review.rating) ? (
                                <AiFillStar className="w-5 h-5 text-yellow-400" />
                              ) : (
                                <AiOutlineStar className="w-5 h-5 text-gray-300" />
                              )}
                            </span>
                          ))}
                          <span className="text-sm text-gray-600 ml-2">{review.rating}/5</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 mt-4">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Favorites Tab */}
            <Tab.Panel>
              <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(hospital => (
                  <motion.div
                    key={hospital.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <img
                      src={hospital.thumbnail}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/hospital/${hospital.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </Link>
                        <button className="text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Profile; 