import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { getCurrentTerms } from "../../services/termsService";

function Terms() {
  const { t } = useTranslation();
  const [termsContent, setTermsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentTerms = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCurrentTerms();
      setTermsContent(Array.isArray(data) ? data[0] : data)

    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCurrentTerms()
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
            {t("terms.lastUpdated")}: {termsContent.updated_at}
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Client Confidentiality */}
            <section className="mb-8">
              <div className="space-y-4">
                <div dangerouslySetInnerHTML={{ __html: termsContent.content }} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
