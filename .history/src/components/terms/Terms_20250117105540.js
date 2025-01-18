import React from "react";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1A3C8E] mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {t("terms.lastUpdated")}: March 15, 2024
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Client Confidentiality */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.confidentiality.title")}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t("terms.sections.confidentiality.content")}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  {t("terms.sections.confidentiality.list", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Ownership of Records */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.records.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.records.content")}
              </p>
            </section>

            {/* Radiographs Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.radiographs.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.radiographs.content")}
              </p>
            </section>

            {/* Patient Photographs */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.photos.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.photos.content")}
              </p>
            </section>

            {/* Fees Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.fees.title")}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                {t("terms.sections.fees.list", { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Treatment Costs */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {t("terms.sections.costs.title")}
              </h2>
              <p className="text-gray-600">
                {t("terms.sections.costs.content")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
