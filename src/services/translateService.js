import axios from 'axios';

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';
const EMAIL = process.env.REACT_APP_MYMEMORY_EMAIL;

export const translateText = async (texts, targetLang, sourceLang = 'en') => {
  try {
    if (!texts || (Array.isArray(texts) && texts.length === 0)) return [];
    
    // Chuyển đổi input thành mảng nếu là string
    const textArray = Array.isArray(texts) ? texts : [texts];
    
    // Dịch từng text riêng biệt nhưng trong một Promise.all
    const translations = await Promise.all(
      textArray.map(text => 
        axios.get(MYMEMORY_API_URL, {
          params: {
            q: text,
            langpair: `${sourceLang}|${targetLang}`,
            de: EMAIL,
          }
        }).then(response => response.data.responseData.translatedText)
      )
    );

    return Array.isArray(texts) ? translations : translations[0];
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(error.response?.data?.message || 'Translation failed');
  }
};

export const translateMultipleTexts = async (texts, targetLang, sourceLang = 'en') => {
  try {
    if (!texts || Object.keys(texts).length === 0) return {};

    // Tách các giá trị thành một mảng để dịch
    const entries = Object.entries(texts);
    const textValues = entries.map(([_, text]) => text).filter(text => text);
    
    // Dịch tất cả các text
    const translatedTexts = await translateText(textValues, targetLang, sourceLang);
    
    // Ghép kết quả dịch với các key tương ứng
    let translationIndex = 0;
    const result = {};
    entries.forEach(([key, text]) => {
      if (text) {
        result[key] = translatedTexts[translationIndex++];
      } else {
        result[key] = '';
      }
    });

    return result;
  } catch (error) {
    console.error('Multiple translations error:', error);
    throw new Error(error.response?.data?.message || 'Multiple translations failed');
  }
}; 