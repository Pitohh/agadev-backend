import axios from 'axios';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export const translateText = async (text, sourceLang = 'FR', targetLang = 'EN-US') => {
  if (!DEEPL_API_KEY || DEEPL_API_KEY === 'demo') {
    console.log('DeepL not configured, returning original text');
    return text;
  }

  try {
    const response = await axios.post(
      DEEPL_API_URL,
      new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text: text,
        source_lang: sourceLang,
        target_lang: targetLang,
        preserve_formatting: '1',
        tag_handling: 'html'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    return text;
  }
};

export default { translateText };