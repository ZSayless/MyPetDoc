import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Heart, Shield } from "lucide-react";

function About() {
  const { t } = useTranslation();

  const values = [
    { icon: Heart, key: "quality" },
    { icon: Users, key: "accessibility" },
    { icon: Shield, key: "trust" },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#1A3C8E]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl opacity-90">{t("about.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A3C8E] mb-6">
              {t("about.mission.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("about.mission.content")}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1A3C8E] mb-12">
            {t("about.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t("about.values.list", { returnObjects: true }).map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                {React.createElement(values[index].icon, {
                  className: "w-12 h-12 text-[#1A3C8E] mx-auto mb-4",
                })}
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A3C8E] mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-gray-600">{t("about.team.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t("about.team.members", { returnObjects: true }).map((member, index) => (
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
      </section>
    </div>
  );
}

export default About; 