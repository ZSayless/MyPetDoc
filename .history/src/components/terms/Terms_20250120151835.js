import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

function Terms() {
  const { t } = useTranslation();
  const [termsContent, setTermsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This will be replaced with API call later
    // For now, use static content
    const staticTerms = {
      lastUpdated: "March 15, 2024",
      sections: {
        confidentiality: {
          title: t("terms.sections.confidentiality.title"),
          content: t("terms.sections.confidentiality.content"),
          list: t("terms.sections.confidentiality.list", { returnObjects: true })
        },
        records: {
          title: t("terms.sections.records.title"),
          content: t("terms.sections.records.content")
        },
        radiographs: {
          title: t("terms.sections.radiographs.title"),
          content: t("terms.sections.radiographs.content")
        },
        photos: {
          title: t("terms.sections.photos.title"),
          content: t("terms.sections.photos.content")
        },
        fees: {
          title: t("terms.sections.fees.title"),
          list: t("terms.sections.fees.list", { returnObjects: true })
        },
        costs: {
          title: t("terms.sections.costs.title"),
          content: t("terms.sections.costs.content")
        }
      }
    };
    
    setTermsContent(staticTerms);
    setLoading(false);
  }, [t]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading terms: {error}</div>;
  if (!termsContent) return null;

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1A3C8E] mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {t("terms.lastUpdated")}: {termsContent.lastUpdated}
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Client Confidentiality */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.confidentiality.title}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {termsContent.sections.confidentiality.content}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  {termsContent.sections.confidentiality.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Ownership of Records */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.records.title}
              </h2>
              <p className="text-gray-600">
                {termsContent.sections.records.content}
              </p>
            </section>

            {/* Radiographs Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.radiographs.title}
              </h2>
              <p className="text-gray-600">
                {termsContent.sections.radiographs.content}
              </p>
            </section>

            {/* Patient Photographs */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.photos.title}
              </h2>
              <p className="text-gray-600">
                {termsContent.sections.photos.content}
              </p>
            </section>

            {/* Fees Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.fees.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                {termsContent.sections.fees.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Treatment Costs */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                {termsContent.sections.costs.title}
              </h2>
              <p className="text-gray-600">
                {termsContent.sections.costs.content}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
