import React from "react";
import { useTranslation } from "react-i18next";

function Community() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("community.title")}</h1>
          <p className="text-gray-600 mt-2">{t("community.subtitle")}</p>
        </div>
        
        {/* Rest of the component */}
      </div>
    </div>
  );
}

export default Community;
