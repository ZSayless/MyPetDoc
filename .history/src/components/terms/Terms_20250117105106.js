import React from "react";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {t("terms.lastUpdated")}: March 15, 2024
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-8">
            {/* Acceptance Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {t("terms.sections.acceptance.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.acceptance.content")}
              </p>
            </section>

            {/* Services Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {t("terms.sections.services.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.services.content")}
              </p>
            </section>

            {/* User Account Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {t("terms.sections.userAccount.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.userAccount.content")}
              </p>
            </section>

            {/* Privacy Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {t("terms.sections.privacy.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.privacy.content")}
              </p>
            </section>

            {/* Content Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                {t("terms.sections.content.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.content.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
