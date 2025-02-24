import React from "react";
import { Link } from "react-router-dom";
import aboutus2 from "../../assets/img/aboutus2.png";
import aboutus1 from "../../assets/img/aboutus1.jpg";
import { motion } from "framer-motion";
import "./AboutUs.css";
import logocustom from "../../assets/img/logocustom.png";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full width image with text overlay */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0">
          <img
            src={aboutus1}
            alt="Happy pets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>{" "}
          {/* Overlay để text dễ đọc */}
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("aboutUs.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl font-medium">
              {t("aboutUs.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Our Dream Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">
              {t("aboutUs.ourDream.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                  {t("aboutUs.ourDream.section1.title")}
                </h3>
                <p className="text-gray-700 text-lg font-medium">
                  {t("aboutUs.ourDream.section1.description")}
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                  {t("aboutUs.ourDream.section2.title")}
                </h3>
                <p className="text-gray-700 text-lg font-medium">
                  {t("aboutUs.ourDream.section2.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our First Steps Section */}
      <div className="bg-[#7CD5D5] py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-12 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">
              {t("aboutUs.ourFirstStep.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl font-medium text-gray-700">1</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {t("aboutUs.ourFirstStep.steps.1.title")}
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.ourFirstStep.steps.1.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl font-medium text-gray-700">2</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {t("aboutUs.ourFirstStep.steps.2.title")}
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.ourFirstStep.steps.2.description")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl font-medium text-gray-700">3</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {t("aboutUs.ourFirstStep.steps.3.title")}
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.ourFirstStep.steps.3.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* We Are Here For You Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side - Image */}
            <div>
              <img
                src={aboutus2}
                alt="Veterinarian with happy dog"
                className="w-[600px] h-auto rounded-lg"
              />
            </div>

            {/* Right side - Content */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-16">
                {t("aboutUs.weAreHere.title")}
              </h2>
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <svg
                      className="w-8 h-8 text-[#7CD5D5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.weAreHere.points.1")}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <svg
                      className="w-8 h-8 text-[#7CD5D5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.weAreHere.points.2")}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <svg
                      className="w-8 h-8 text-[#7CD5D5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg font-medium">
                    {t("aboutUs.weAreHere.points.3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("aboutUs.ourPromise.title")}
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-0">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="arrow-step">
                  <span className="text-2xl font-medium text-gray-600">1</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    {t("aboutUs.ourPromise.promises.1.title")}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t("aboutUs.ourPromise.promises.1.description")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="arrow-step">
                  <span className="text-2xl font-medium text-gray-600">2</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    {t("aboutUs.ourPromise.promises.2.title")}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t("aboutUs.ourPromise.promises.2.description")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="arrow-step">
                  <span className="text-2xl font-medium text-gray-600">3</span>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    {t("aboutUs.ourPromise.promises.3.title")}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t("aboutUs.ourPromise.promises.3.description")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us CTA Section */}
      <div className="bg-[#7CD5D5] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <Link
              to="/contactus"
              className="bg-white text-[#4A4A4A] px-8 py-4 rounded-lg text-xl font-medium hover:bg-gray-50 transition duration-300"
            >
              {t("aboutUs.contactUs.button")}
            </Link>
          </div>
        </div>
      </div>

      {/* MYPETDOC LOGO Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#4A4A4A] text-2xl md:text-3xl font-bold mb-12">
              {t("aboutUs.logo.title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Left side - Logo */}
              <div className="mt-8">
                <img
                  src={logocustom}
                  alt="MyPetDoc Logo"
                  className="w-[400px]"
                />
              </div>

              {/* Right side - Description */}
              <div className="space-y-8">
                <div>
                  <p className="text-[#4A4A4A] text-lg md:text-xl font-medium">
                    <span className="font-bold">
                      {t("aboutUs.logo.colorScheme.title")}
                    </span>{" "}
                    {t("aboutUs.logo.colorScheme.description")}
                  </p>
                </div>

                <div>
                  <p className="text-[#4A4A4A] text-lg md:text-xl font-medium">
                    <span className="font-bold">
                      {t("aboutUs.logo.symbols.title")}
                    </span>{" "}
                    {t("aboutUs.logo.symbols.description")}
                  </p>
                </div>

                <div>
                  <p className="text-[#4A4A4A] text-lg md:text-xl font-medium">
                    <span className="font-bold">
                      {t("aboutUs.logo.fontStyle.title")}
                    </span>{" "}
                    {t("aboutUs.logo.fontStyle.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
