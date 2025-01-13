import { Routes, Route } from "react-router-dom";
import AboutUs from "../component/aboutus/AboutUs";
import ContactUs from "../component/contactus/ContactUs";
import BlogList from "../component/blog/BlogList";
import Community from "../component/community/Community";
import Setting from "../component/setting/Setting";

// Tạo Home component tạm thời
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Home Page</h1>
    </div>
  );
};

// Tạo Service component tạm thời 
const Service = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Service Page</h1>
    </div>
  );
};

// Tạo Terms component tạm thời
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              These Website Standard Terms and Conditions written on this webpage shall manage your use of our website.
              These Terms will be applied fully and affect to your use of this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Intellectual Property Rights</h2>
            <p className="text-gray-600">
              Other than the content you own, under these Terms, Our Company and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Restrictions</h2>
            <p className="text-gray-600 mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Publishing any Website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
              <li>Publicly performing and/or showing any Website material</li>
              <li>Using this Website in any way that is or may be damaging to this Website</li>
              <li>Using this Website contrary to applicable laws and regulations</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/service" element={<Service />} />
      <Route path="/bloglist" element={<BlogList />} />
      <Route path="/community" element={<Community />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default AppRoutes; 