import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#98E9E9] to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-[#1A3C8E]">
              {t("aboutUs.title")}
            </h1>
            <p className="text-xl text-gray-700">
              {t("aboutUs.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-gray-600">
              <p>{t("aboutUs.story.p1")}</p>
              <p>{t("aboutUs.story.p2")}</p>
              <p>{t("aboutUs.story.p3")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1A3C8E] mb-12">
            {t("aboutUs.team.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t("aboutUs.team.members", { returnObjects: true }).map((member, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[#1A3C8E] mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1A3C8E] mb-12">
            {t("aboutUs.testimonials.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t("aboutUs.testimonials.list", { returnObjects: true }).map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#1A3C8E] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("aboutUs.cta.title")}</h2>
          <p className="text-xl mb-8 opacity-90">{t("aboutUs.cta.subtitle")}</p>
          <Link
            to="/find-hospital"
            className="inline-block px-8 py-3 bg-[#98E9E9] text-[#1A3C8E] rounded-full font-medium hover:bg-white transition-colors"
          >
            {t("aboutUs.cta.button")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
