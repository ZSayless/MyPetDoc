import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <div className="w-full">
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
                    {t("lucete.hero.title")}
                  </h1>
                  <p className="text-sm text-white/90 mb-4">
                    {t("lucete.hero.subtitle")}
                  </p>
                </div>
              </div>

              {/* Desktop Version (Hidden on mobile) */}
              <div className="hidden sm:flex h-full items-center px-8 md:px-16 lg:px-32">
                <div className="max-w-xl">
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-2 sm:mb-4 text-white whitespace-nowrap ml-24 sm:ml-36 md:ml-48">
                    {t("lucete.hero.title")}
                  </h1>
                  <p className="text-base md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 ml-24 sm:ml-36 md:ml-48 whitespace-nowrap">
                    {t("lucete.hero.subtitle")}
                  </p>
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
                <span className="font-bold">
                  {t("lucete.memorialGem.title.start")}
                </span>{" "}
                {t("lucete.memorialGem.title.middle")}{" "}
                <span className="font-bold">
                  {t("lucete.memorialGem.title.end")}
                </span>
              </h2>

              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start mb-8 sm:mb-12">
                <div className="md:w-1/2 pt-1">
                  <p className="text-gray-700 text-base sm:text-lg">
                    <span className="font-bold">
                      {t("lucete.memorialGem.description.part1")}
                    </span>{" "}
                    {t("lucete.memorialGem.description.part2")}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {t("lucete.memorialGem.description.part3")}
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
                    {t("lucete.whyChoose.title")}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          {t("lucete.whyChoose.reasons.preservation.title")}
                        </h3>
                        <p className="text-gray-700">
                          {t(
                            "lucete.whyChoose.reasons.preservation.description"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          {t("lucete.whyChoose.reasons.keepsake.title")}
                        </h3>
                        <p className="text-gray-700">
                          {t("lucete.whyChoose.reasons.keepsake.description")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          {t("lucete.whyChoose.reasons.technology.title")}
                        </h3>
                        <p className="text-gray-700">
                          {t("lucete.whyChoose.reasons.technology.description")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-start">
                      <span className="text-blue-600 text-lg">✓</span>
                      <div>
                        <h3 className="text-lg font-bold mb-0.5">
                          {t("lucete.whyChoose.reasons.reversible.title")}
                        </h3>
                        <p className="text-gray-700">
                          {t("lucete.whyChoose.reasons.reversible.description")}
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
                {t("lucete.preservingMemories.title")}
              </h2>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h3 className="text-2xl mb-4">
                    {t("lucete.preservingMemories.unfadingBeauty.title")}
                  </h3>
                  <p className="text-gray-700">
                    {t("lucete.preservingMemories.unfadingBeauty.description")}
                  </p>
                </div>

                <div className="md:w-1/2">
                  <h3 className="text-2xl mb-4">
                    {t("lucete.preservingMemories.alwaysTogether.title")}
                  </h3>
                  <p className="text-gray-700">
                    {t("lucete.preservingMemories.alwaysTogether.description")}
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
              <h2 className="text-4xl mb-16">
                {t("lucete.preservingMemories.process.title")}
              </h2>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-[1px] h-full w-[2px] bg-[#E5EAF5]"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        {t("lucete.preservingMemories.process.steps.1")}
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
                        {t("lucete.preservingMemories.process.steps.2")}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        {t("lucete.preservingMemories.process.steps.3")}
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
                        {t("lucete.preservingMemories.process.steps.4")}
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="relative flex items-center">
                    <div className="flex-1 text-right pr-12">
                      <p className="text-lg text-gray-600">
                        {t("lucete.preservingMemories.process.steps.5")}
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
                {t("lucete.powerOfTechnology.title")}
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
                  <h3 className="text-2xl mb-4">
                    {t("lucete.powerOfTechnology.lowTemperature.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("lucete.powerOfTechnology.lowTemperature.description")}
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
                  <h3 className="text-2xl mb-4">
                    {t("lucete.powerOfTechnology.advancedTechnology.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      "lucete.powerOfTechnology.advancedTechnology.description"
                    )}
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
                  <h3 className="text-2xl mb-4">
                    {t("lucete.powerOfTechnology.unwaverQuality.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("lucete.powerOfTechnology.unwaverQuality.description")}
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
              <p className="text-gray-600">{t("lucete.gallery.subtitle")}</p>
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
                {t("lucete.orderProcess.title")}
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
                        {t("lucete.orderProcess.steps.1.title")}
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        {t("lucete.orderProcess.steps.1.description")}
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
                        {t("lucete.orderProcess.steps.2.title")}
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        {t("lucete.orderProcess.steps.2.description")}
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
                        {t("lucete.orderProcess.steps.3.title")}
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg">
                        {t("lucete.orderProcess.steps.3.description")}
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
              <h2 className="text-5xl mb-16">
                {t("lucete.lastingTribute.title")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Personalized Jewelry */}
                <div>
                  <h3 className="text-3xl mb-4">
                    {t("lucete.lastingTribute.personalizedJewelry.title")}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t("lucete.lastingTribute.personalizedJewelry.description")}
                  </p>
                </div>

                {/* Meaningful Symbol */}
                <div>
                  <h3 className="text-3xl mb-4">
                    {t("lucete.lastingTribute.meaningfulSymbol.title")}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t("lucete.lastingTribute.meaningfulSymbol.description")}
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
              <h2 className="text-5xl mb-16">{t("lucete.difference.title")}</h2>

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
                      <h3 className="text-3xl mb-4">
                        {t("lucete.difference.enduringLegacy.title")}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {t("lucete.difference.enduringLegacy.description")}
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
                      <h3 className="text-3xl mb-4">
                        {t("lucete.difference.uniqueTechnology.title")}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {t("lucete.difference.uniqueTechnology.description")}
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
                      <h3 className="text-3xl mb-4">
                        {t("lucete.difference.meaningfulGift.title")}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {t("lucete.difference.meaningfulGift.description")}
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
                  {t("lucete.rememberingAndHonoring.title")}
                </h2>
                <p className="text-gray-600 text-xl leading-relaxed">
                  {t("lucete.rememberingAndHonoring.description")}
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
                  {t("lucete.contactUs.title")}
                </h2>
                <p className="text-gray-500">Contact us 자세히 알아보기</p>
                {isContactOpen && (
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact-us"
                      className="w-full sm:w-auto text-center bg-[#7B91F7] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#6A7FE5] transition duration-300"
                    >
                      {t("lucete.contactUs.button.contact")}
                    </a>
                    <a
                      href="/contact-us"
                      className="w-full sm:w-auto text-center border border-[#7B91F7] text-[#7B91F7] px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                      {t("lucete.contactUs.button.learnMore")}
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
