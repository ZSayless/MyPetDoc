import React, { useState } from "react";
import rusedde from "../../assets/img/rusedde-ddoci-02.jpg";
import ruseddeMoyang01 from "../../assets/img/rusedde-moyang-01.jpg";
import ruseddeHaru01 from "../../assets/img/rusedde-haru-01.jpg";
import temperature from "../../assets/img/temperature.png";
import digitaltech from "../../assets/img/digitaltech.jpg";
import badge from "../../assets/img/badge.jpg";
import gallery1 from "../../assets/img/1.jpg";
import gallery2 from "../../assets/img/2.jpg";
import gallery3 from "../../assets/img/3.jpg";
import gallery4 from "../../assets/img/4.jpg";
import gallery5 from "../../assets/img/5.jpg";
import gallery6 from "../../assets/img/6.jpg";
import ruseddeRina01 from "../../assets/img/rusedde-rina-01.jpg";
import ruseddeBboggu01 from "../../assets/img/rusedde-bboggu-01.jpg";
import ruseddeCici06 from "../../assets/img/rusedde-cici-06.jpg";

const Lucete = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          .lucete-container {
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style>
      <div className="w-full lucete-container">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
          <img
            src={rusedde}
            alt="LUCETE hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent">
            <div className="container mx-auto h-full">
              {/* Mobile Version (Hidden on sm and above) */}
              <div className="flex h-full items-center px-4 sm:hidden">
                <div className="max-w-xl">
                  <h1 className="text-2xl font-serif mb-2 text-white">
                    LUCETE: Memorial Pet Jewelry
                  </h1>
                  <p className="text-sm text-white/90 mb-4">
                    Transforming ashes into a lasting tribute.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Desktop Version (Hidden on mobile) */}
              <div className="hidden sm:flex h-full items-center px-8 md:px-16 lg:px-32">
                <div className="max-w-xl">
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-2 sm:mb-4 text-white whitespace-nowrap ml-24 sm:ml-36 md:ml-48">
                    LUCETE: Memorial Pet Jewelry
                  </h1>
                  <p className="text-base md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 ml-24 sm:ml-36 md:ml-48 whitespace-nowrap">
                    Transforming ashes into a lasting tribute.
                  </p>
                  <button className="bg-blue-600 text-white px-6 md:px-8 py-2 sm:py-3 text-base rounded-md hover:bg-blue-700 transition duration-300 ml-24 sm:ml-36 md:ml-48">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* First Section */}
              <h2 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
                <span className="font-bold">LUCETE:</span> A Memorial Gem
                Created from{" "}
                <span className="font-bold">Your Pet's Cremated Remains</span>
              </h2>

              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start mb-8 sm:mb-12">
                <div className="md:w-1/2 pt-1">
                  <p className="text-gray-700 text-base sm:text-lg">
                    <span className="font-bold">LUCETE</span> is a{" "}
                    <span className="font-bold">
                      one-of-a-kind memorial diamond service that transforms
                      your beloved pet's cremated remains into a beautiful
                      gemstone.
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    With LUCETE, you can forever cherish the memory of your pet
                    in a timeless and elegant form, keeping them close to your
                    heart.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={ruseddeMoyang01}
                    alt="Green memorial diamonds"
                    className="w-full rounded-lg aspect-video"
                  />
                </div>
              </div>

              {/* Why Choose LUCETE Section */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                <div className="md:w-1/2">
                  <img
                    src={ruseddeHaru01}
                    alt="Heart shaped memorial diamond"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
                    Why Choose LUCETE?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          Eternal Preservation
                        </h3>
                        <p className="text-gray-700">
                          Unlike traditional cremation urns,{" "}
                          <span className="font-bold">LUCETE</span> gemstones do
                          not decay and can be kept forever.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          A Personal Keepsake
                        </h3>
                        <p className="text-gray-700">
                          Crafted into jewelry such as rings or necklaces,
                          allowing you to carry your pet's memory with you
                          wherever you go.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          Innovative Technology
                        </h3>
                        <p className="text-gray-700">
                          Using a unique{" "}
                          <span className="font-bold">
                            low-temperature melting process
                          </span>
                          , <span className="font-bold">LUCETE</span> retains
                          99.9% of the original remains while avoiding damage
                          caused by high-temperature cremation methods.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          Reversible Process
                        </h3>
                        <p className="text-gray-700">
                          <span className="font-bold">LUCETE</span> is the only
                          technology in the world that allows you to{" "}
                          <span className="font-bold">
                            restore the gemstone back to ashes
                          </span>{" "}
                          if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preserving Memories Section */}
        <div className="py-8 mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-12">
                Preserving Memories
              </h2>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl mb-4">Unfading Beauty</h3>
                  <p className="text-gray-700">
                    LUCETE memorial diamonds prevent the decay of cremated
                    remains, ensuring they remain preserved for generations.
                    Unlike traditional ashes, which can deteriorate over time,
                    LUCETE diamonds offer permanent protection.
                  </p>
                </div>

                <div className="md:w-1/2">
                  <h3 className="text-2xl mb-4">Always Together</h3>
                  <p className="text-gray-700">
                    Carry your loved one's memory wherever you go. LUCETE
                    memorial diamonds can be incorporated into jewelry, allowing
                    you to keep their essence close to your heart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The LUCETE Process Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl mb-16">The LUCETE Process</h2>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-[1px] h-full w-[2px] bg-[#E5EAF5]"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        The cremated remains are carefully measured and
                        processed to remove impurities.
                      </p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#E5EAF5] rounded-lg flex items-center justify-center z-10">
                      <span className="text-gray-600 font-medium">1</span>
                    </div>
                    <div className="flex-1 pl-12"></div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-center">
                    <div className="flex-1"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#E5EAF5] rounded-lg flex items-center justify-center z-10">
                      <span className="text-gray-600 font-medium">2</span>
                    </div>
                    <div className="flex-1 pl-12">
                      <p className="text-lg text-gray-600">
                        The remains are mixed with a special material and placed
                        in a drying chamber for controlled drying.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        The material is precisely ground into a fine powder,
                        ready for the next stage.
                      </p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#E5EAF5] rounded-lg flex items-center justify-center z-10">
                      <span className="text-gray-600 font-medium">3</span>
                    </div>
                    <div className="flex-1"></div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-center">
                    <div className="flex-1"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#E5EAF5] rounded-lg flex items-center justify-center z-10">
                      <span className="text-gray-600 font-medium">4</span>
                    </div>
                    <div className="flex-1 pl-12">
                      <p className="text-lg text-gray-600">
                        The powder is carefully inserted into molds and placed
                        in a high-tech fusion furnace.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        The material is melted under controlled conditions, and
                        the diamond crystallizes.
                      </p>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#E5EAF5] rounded-lg flex items-center justify-center z-10">
                      <span className="text-gray-600 font-medium">5</span>
                    </div>
                    <div className="flex-1"></div>
                  </div>

                  {/* Bottom Line Extension */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-[1px] h-20 w-[2px] bg-[#E5EAF5]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Power of Technology Section */}
        <div className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-12 md:mb-16 text-center">
                The Power of Technology
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                {/* Low-Temperature Melting */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg">
                      <img
                        src={temperature}
                        alt="Temperature icon"
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4">Low-Temperature Melting</h3>
                  <p className="text-gray-600">
                    LUCETE's unique low-temperature melting method ensures a
                    99.9% preservation rate of cremated remains, safeguarding
                    their essence.
                  </p>
                </div>

                {/* Advanced Technology */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg">
                      <img
                        src={digitaltech}
                        alt="Digital technology icon"
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4">Advanced Technology</h3>
                  <p className="text-gray-600">
                    The process utilizes state-of-the-art equipment and
                    techniques to transform ashes into diamonds.
                  </p>
                </div>

                {/* Unwavering Quality */}
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg">
                      <img
                        src={badge}
                        alt="Badge icon"
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4">Unwavering Quality</h3>
                  <p className="text-gray-600">
                    LUCETE diamonds are crafted with the highest precision and
                    care, resulting in a beautiful and lasting tribute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl mb-2 font-bold">LUCETE</h2>
              <p className="text-gray-600">Value beyond luxury</p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery1}
                  alt="Gallery image 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery2}
                  alt="Gallery image 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery3}
                  alt="Gallery image 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery4}
                  alt="Gallery image 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery5}
                  alt="Gallery image 5"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] bg-gray-100 rounded overflow-hidden">
                <img
                  src={gallery6}
                  alt="Gallery image 6"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Process Section */}
        <div className="py-12 sm:py-16 md:py-24 bg-[#7B91F7]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-8 sm:mb-12 md:mb-20">
                Order Process
              </h2>

              <div className="relative">
                {/* Vertical Progress Line */}
                <div className="absolute left-[30px] sm:left-[60px] md:left-[75px] top-0 w-0.5 h-full bg-white/20"></div>

                <div className="space-y-6 sm:space-y-8">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-[60px] sm:w-[120px] md:w-[120px] h-[45px] sm:h-[90px] bg-white rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl sm:text-4xl text-[#7B91F7] font-medium">
                        1
                      </span>
                    </div>
                    <div className="pt-1 sm:pt-4">
                      <h3 className="text-xl sm:text-2xl text-white mb-1 sm:mb-2">
                        Consultation
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        Initiate a consultation to discuss your vision for a
                        LUCETE memorial diamond.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-[120px] sm:w-[240px] md:w-[240px] h-[45px] sm:h-[90px] bg-white rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl sm:text-4xl text-[#7B91F7] font-medium">
                        2
                      </span>
                    </div>
                    <div className="pt-1 sm:pt-4">
                      <h3 className="text-xl sm:text-2xl text-white mb-1 sm:mb-2">
                        Order Form
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        Complete an order form outlining your preferences and
                        payment information.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-[180px] sm:w-[360px] md:w-[360px] h-[45px] sm:h-[90px] bg-white rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl sm:text-4xl text-[#7B91F7] font-medium">
                        3
                      </span>
                    </div>
                    <div className="pt-1 sm:pt-4">
                      <h3 className="text-xl sm:text-2xl text-white mb-1 sm:mb-2">
                        Delivery
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        Deliver the cremated remains, ensuring accurate
                        measurement and accompanying documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creating a Lasting Tribute Section */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl mb-16">Creating a Lasting Tribute</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Personalized Jewelry */}
                <div>
                  <h3 className="text-3xl mb-4">Personalized Jewelry</h3>
                  <p className="text-gray-600 text-lg">
                    Choose from a variety of jewelry designs to create a custom
                    piece that honors your loved one's memory.
                  </p>
                </div>

                {/* Meaningful Symbol */}
                <div>
                  <h3 className="text-3xl mb-4">Meaningful Symbol</h3>
                  <p className="text-gray-600 text-lg">
                    A LUCETE diamond is more than just a gemstone; it's a
                    tangible expression of your love and connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The LUCETE Difference Section */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl mb-16">The LUCETE Difference</h2>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-8 md:p-12 space-y-16">
                  {/* Enduring Legacy */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                      <img
                        src={ruseddeRina01}
                        alt="LUCETE necklace"
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-3xl mb-4">Enduring Legacy</h3>
                      <p className="text-gray-600 text-lg">
                        LUCETE diamonds offer a timeless tribute that will
                        endure for generations to come.
                      </p>
                    </div>
                  </div>

                  {/* Unique Technology */}
                  <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-gray-100 -mx-8 md:-mx-12 p-8 md:p-12">
                    <div className="md:w-1/2">
                      <img
                        src={ruseddeBboggu01}
                        alt="LUCETE jewelry on blue background"
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-3xl mb-4">Unique Technology</h3>
                      <p className="text-gray-600 text-lg">
                        LUCETE's innovative process ensures the highest level of
                        care and preservation.
                      </p>
                    </div>
                  </div>

                  {/* Meaningful Gift */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/2">
                      <img
                        src={ruseddeCici06}
                        alt="LUCETE ring and diamonds"
                        className="w-full h-[300px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-3xl mb-4">Meaningful Gift</h3>
                      <p className="text-gray-600 text-lg">
                        A LUCETE diamond is a cherished gift that honors the
                        memory of a loved one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remembering and Honoring Section */}
        <div className="py-24 bg-[#7B91F7]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/90 rounded-2xl p-8 md:p-12">
                <h2 className="text-4xl md:text-5xl mb-6">
                  Remembering and Honoring
                </h2>
                <p className="text-gray-600 text-xl leading-relaxed">
                  LUCETE memorial diamonds provide a beautiful and enduring way
                  to remember and honor those you love. Choose LUCETE to create
                  a lasting tribute that will keep their memory alive forever.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div
                className="bg-gray-100 rounded-lg p-4 sm:p-6 cursor-pointer"
                onClick={() => setIsContactOpen(!isContactOpen)}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2">
                  Contact us
                </h2>
                <p className="text-gray-500">Contact us 자세히 알아보기</p>
                {isContactOpen && (
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact-us"
                      className="w-full sm:w-auto text-center bg-[#7B91F7] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#6A7FE5] transition duration-300"
                    >
                      Contact us
                    </a>
                    <a
                      href="/contact-us"
                      className="w-full sm:w-auto text-center border border-[#7B91F7] text-[#7B91F7] px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      자세히 알아보기
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lucete;
