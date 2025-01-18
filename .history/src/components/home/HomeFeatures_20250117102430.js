import { useTranslation } from "react-i18next";
import { Stethoscope, Building2, Clock } from "lucide-react";

function HomeFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Stethoscope,
      title: t("home.features.expertVets"),
      description: t("home.features.expertVetsDesc")
    },
    {
      icon: Building2,
      title: t("home.features.modernFacilities"),
      description: t("home.features.modernFacilitiesDesc")
    },
    {
      icon: Clock,
      title: t("home.features.emergency"),
      description: t("home.features.emergencyDesc")
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("home.features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#98E9E9] rounded-full mb-6">
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeFeatures; 