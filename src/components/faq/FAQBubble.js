import React, { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./FAQBubble.css";
import { faqService } from "../../services/faqService";
import { useTranslation } from "react-i18next";

const FAQBubble = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await faqService.getFaqs();
        if (response && response.faqs) {
          setFaqs(response.faqs);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAnswer = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Check if current page is admin or settings
  if (
    location.pathname.includes("/admin") ||
    location.pathname.includes("/setting")
  ) {
    return null;
  }

  return (
    <div className="faq-bubble">
      <button
        className="faq-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close FAQ" : "Open FAQ"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#1A3C8E]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#1A3C8E]" />
        )}
      </button>

      {isOpen && (
        <div className="faq-popup">
          <div className="faq-header">
            <h3 className="text-lg font-semibold">{t("faq.title")}</h3>
            <p className="text-sm mt-1">{t("faq.description")}</p>
          </div>

          <div className="faq-content divide-y">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Đang tải...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                Có lỗi xảy ra. Đang hiển thị dữ liệu mẫu.
              </div>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className="p-4">
                  <button
                    onClick={() => toggleAnswer(faq.id)}
                    className="w-full flex justify-between items-start gap-4"
                  >
                    <span className="font-medium text-left">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform ${
                        expandedId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === faq.id && (
                    <p className="mt-2 text-gray-600 pl-4 border-l-2 border-[#98E9E9]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQBubble;
