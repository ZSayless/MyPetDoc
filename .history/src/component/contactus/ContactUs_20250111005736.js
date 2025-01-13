import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ContactUs = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 37.3382,
    lng: -121.8863,
  };

  return (
    <section>
      <div className="w-full">
        <div
          className="relative bg-[url('https://bizmap.dexignzone.com/react/demo/static/media/bnr1.fc9916a8.jpg')] 
        bg-cover bg-center bg-no-repeat h-[300px] md:h-[400px] flex flex-col items-center justify-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
        >
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-[50px] font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-[18px] mb-8">
              Find awesome places, bars, restaurants & activities.
            </p>
            <div className="flex justify-center items-center space-x-2 text-sm md:text-base ">
              <div className="py-[10px] px-[20px] btn__contact rounded">
                <Link
                  to="/"
                  className="text-[14px] font-[500px] cursor-pointer"
                >
                  Home
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to="/contactus"
                  className="text-[14px] font-[500px] cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-[100px] mb-[50px]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="contact__card bg-white rounded-lg shadow-sm py-[50px] px-[20px] h-full">
              <div className="flex flex-col items-center">
                <div className="contact__icon bg-[#4611a7] rounded-full p-[28px] mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#0c0e1a]">
                  ADDRESS
                </h3>
                <p className="text-[#606269] text-center">
                  123 West Street, Melbourne
                </p>
                <p className="text-[#606269] text-center">
                  Victoria 3000 Australia
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="contact__card bg-white rounded-lg shadow-sm py-[50px] px-[20px] h-full">
              <div className="flex flex-col items-center">
                <div className="contact__icon bg-[#4611a7] rounded-full p-[28px] mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#0c0e1a]">
                  EMAIL
                </h3>
                <p className="text-[#606269] text-center">info@example.com</p>
                <p className="text-[#606269] text-center">info@example.com</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="contact__card bg-white rounded-lg shadow-sm py-[50px] px-[20px] h-full">
              <div className="flex flex-col items-center">
                <div className="contact__icon bg-[#4611a7] rounded-full p-[28px] mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#0c0e1a]">
                  PHONE
                </h3>
                <p className="text-[#606269] text-center">+61 3 8376 6284</p>
                <p className="text-[#606269] text-center">+23 123 456 7890</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="contact__card bg-white rounded-lg shadow-sm py-[50px] px-[20px] h-full">
              <div className="flex flex-col items-center">
                <div className="contact__icon bg-[#4611a7] rounded-full p-[28px] mb-4">
                  <Printer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#0c0e1a]">
                  FAX
                </h3>
                <p className="text-[#606269] text-center">+61 3 8376 6284</p>
                <p className="text-[#606269] text-center">+23 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
            <div className="w-12 h-1 bg-[#6B21A8] mb-6"></div>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>

            <form className="space-y-6 contact__form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-[30px] border border-gray-300 focus:outline-none text-[#000]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Id"
                  className="w-full px-4 py-3 rounded-[30px] border border-gray-300 focus:outline-none text-[#000]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-[30px] border border-gray-300 focus:outline-none text-[#000]"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-[30px] border border-gray-300 focus:outline-none text-[#000]"
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message..."
                rows="4"
                className="w-full px-4 py-3 rounded-[30px] border border-gray-300 focus:outline-none text-[#000]"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-[#4611a7] px-8 py-3 rounded-[30px] font-normal "
              >
                SUBMIT NOW
              </button>
            </form>
          </div>

          <div className="h-[600px] bg-white rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6696584237116!2d106.66488007465357!3d10.75992005944615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x9259bad475336d5c!2zQuG7h25oIHZp4buHbiBUaMO6IHkgUGV0UHJv!5e0!3m2!1svi!2s!4v1710338305071!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
