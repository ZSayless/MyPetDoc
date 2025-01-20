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
          title: "1. Client Confidentiality",
          content: "All information relating to both client and patient is held in confidence and in line with the Data Protection Acts and will not be disclosed except under the following circumstances:",
          list: [
            "Where a client provides a confirmed request in writing.",
            "Where another Veterinary Surgeon requests this in order to continue the patient's care.",
            "To a court or agent of The Pet Health Partnership as part of a legal process.",
            "Where The Pet Health Partnership uses outsourced reminder services for treatments, vaccinations, or medication reminders."
          ]
        },
        records: {
          title: "2. Ownership of Records",
          content: "All case records, laboratory results, X-rays and similar documents are the property of MyPetDoc Veterinary Practice."
        },
        radiographs: {
          title: "3. Radiographs and Other Documents",
          content: "The care given to your pet may involve making some specific investigations, for example taking radiographs or performing ultrasound scans. Even though we make a charge for carrying out these investigations and interpreting their results, ownership of the resulting record remains with the practice."
        },
        photos: {
          title: "4. Patient Photographs",
          content: "Photographs may be taken of your pet for their medical record. These remain the property of MyPetDoc Veterinary Practice."
        },
        fees: {
          title: "5. Fees and Payment Terms",
          list: [
            "All fees are due for payment at the time of the consultation or when your pet is discharged.",
            "All fees are subject to VAT at the current rate.",
            "Fee levels are determined by the time spent on a case and according to the drugs, materials, and consumables used."
          ]
        },
        costs: {
          title: "6. Treatment Costs",
          content: "We will provide you with a detailed estimate of costs for any surgical procedures or treatments. Please note that any estimate given can only be approximate."
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
