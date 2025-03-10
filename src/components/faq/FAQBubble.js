import React, { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown, Globe } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./FAQBubble.css";
import { faqService } from "../../services/faqService";
import { useTranslation } from "react-i18next";
import { translateMultipleTexts } from "../../services/translateService";

const FAQBubble = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState({});
  const [showAll, setShowAll] = useState(false);
  const ITEMS_TO_SHOW = 5;

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

  const translateContent = async (targetLang) => {
    try {
      setIsTranslating(true);
      
      const sourceLang = targetLang === 'vi' ? 'en' : 'vi';
      
      // Tạo object chứa tất cả câu hỏi và câu trả lời
      const textsToTranslate = faqs.reduce((acc, faq) => {
        acc[`question_${faq.id}`] = faq.question;
        acc[`answer_${faq.id}`] = faq.answer;
        return acc;
      }, {});

      // Dịch tất cả nội dung
      const translated = await translateMultipleTexts(textsToTranslate, targetLang, sourceLang);

      // Chuyển đổi kết quả dịch về format phù hợp
      const translatedFaqs = faqs.map(faq => ({
        ...faq,
        question: translated[`question_${faq.id}`] || faq.question,
        answer: translated[`answer_${faq.id}`] || faq.answer
      }));

      setTranslatedContent(translatedFaqs);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

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

  const displayFaqs = translatedContent.length > 0 ? translatedContent : faqs;
  const visibleFaqs = showAll ? displayFaqs : displayFaqs.slice(0, ITEMS_TO_SHOW);
  const hasMore = displayFaqs.length > ITEMS_TO_SHOW;

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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t("faq.title")}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => translateContent('vi')}
                  disabled={isTranslating}
                  className={`flex items-center gap-2 px-3 py-1.5 min-w-[110px] justify-center ${
                    isTranslating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#98E9E9] hover:bg-[#7CD5D5]'
                  } text-gray-700 rounded-lg transition-colors text-sm`}
                >
                  {isTranslating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-700 border-t-transparent" />
                      <span className="whitespace-nowrap">{t('Translating...')}</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Tiếng Việt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => translateContent('en')}
                  disabled={isTranslating}
                  className={`flex items-center gap-2 px-3 py-1.5 min-w-[110px] justify-center ${
                    isTranslating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#98E9E9] hover:bg-[#7CD5D5]'
                  } text-gray-700 rounded-lg transition-colors text-sm`}
                >
                  {isTranslating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-700 border-t-transparent" />
                      <span className="whitespace-nowrap">{t('Translating...')}</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">English</span>
                    </>
                  )}
                </button>
              </div>
            </div>
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
              <>
                {visibleFaqs.map((faq) => (
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
                ))}

                {hasMore && (
                  <div className="p-4 text-center">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-[#1A3C8E] hover:text-blue-700 font-medium flex items-center gap-2 mx-auto"
                    >
                      {showAll ? (
                        <>
                          Thu gọn
                          <ChevronDown className="w-4 h-4 rotate-180" />
                        </>
                      ) : (
                        <>
                          Xem thêm {displayFaqs.length - ITEMS_TO_SHOW} câu hỏi
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQBubble;
