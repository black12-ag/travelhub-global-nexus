import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  am: { name: 'አማርኛ', flag: '🇪🇹' },
  or: { name: 'Oromiffa', flag: '🇪🇹' },
  ti: { name: 'ትግርኛ', flag: '🇪🇹' },
  so: { name: 'Somali', flag: '🇸🇴' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇵🇹' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  ur: { name: 'اردو', flag: '🇵🇰' },
  fa: { name: 'فارسی', flag: '🇮🇷' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  sw: { name: 'Kiswahili', flag: '🇰🇪' },
  ha: { name: 'Hausa', flag: '🇳🇬' },
  yo: { name: 'Yoruba', flag: '🇳🇬' },
  ig: { name: 'Igbo', flag: '🇳🇬' },
  zu: { name: 'isiZulu', flag: '🇿🇦' },
  af: { name: 'Afrikaans', flag: '🇿🇦' },
  th: { name: 'ไทย', flag: '🇹🇭' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  id: { name: 'Bahasa Indonesia', flag: '🇮🇩' },
  ms: { name: 'Bahasa Melayu', flag: '🇲🇾' },
  tl: { name: 'Filipino', flag: '🇵🇭' }
};

const translations = {
  en: {
    'find_hotels': 'Find Hotels in Addis Ababa',
    'check_in': 'Check-in',
    'check_out': 'Check-out',
    'guests': 'Guests',
    'guest': 'Guest',
    'hotels': 'Hotels',
    'properties': 'Properties',
    'select_area': 'Select area in Addis Ababa',
    'all_areas': 'All Areas',
    'near_me': 'Near Me',
    'adults': 'Adults',
    'children': 'Children',
    'rooms': 'Rooms',
    'ages_13_above': 'Ages 13 or above',
    'ages_2_12': 'Ages 2-12',
    'filters': 'Filters',
    'sort_by': 'Sort By',
    'price_range': 'Price Range',
    'star_rating': 'Star Rating',
    'property_type': 'Property Type',
    'amenities': 'Amenities',
    'clear_all': 'Clear All',
    'apply_filters': 'Apply Filters',
    'become_host': 'Become a Host'
  },
  am: {
    'find_hotels': 'በአዲስ አበባ ሆቴሎችን ያግኙ',
    'check_in': 'መግቢያ',
    'check_out': 'መውጫ',
    'guests': 'እንግዶች',
    'guest': 'እንግዳ',
    'hotels': 'ሆቴሎች',
    'properties': 'ንብረቶች',
    'select_area': 'በአዲስ አበባ አካባቢ ይምረጡ',
    'all_areas': 'ሁሉም አካባቢዎች',
    'near_me': 'ከእኔ አቅራቢያ',
    'adults': 'ትልቅ ሰዎች',
    'children': 'ልጆች',
    'rooms': 'ክፍሎች',
    'ages_13_above': 'ከ13 እና በላይ',
    'ages_2_12': 'ከ2-12 የሚሆኑ',
    'filters': 'ማጣሪያዎች',
    'sort_by': 'በ ይደርደሩ',
    'price_range': 'የዋጋ ክልል',
    'star_rating': 'የኮከብ ደረጃ',
    'property_type': 'የንብረት አይነት',
    'amenities': 'አገልግሎቶች',
    'clear_all': 'ሁሉንም አጽዳ',
    'apply_filters': 'ማጣሪያዎችን ተግብር',
    'become_host': 'አስተናጋጅ ይሁኑ'
  },
  ar: {
    'find_hotels': 'ابحث عن فنادق في أديس أبابا',
    'check_in': 'تسجيل الوصول',
    'check_out': 'تسجيل المغادرة',
    'guests': 'النزلاء',
    'guest': 'نزيل',
    'hotels': 'الفنادق',
    'properties': 'العقارات',
    'select_area': 'اختر منطقة في أديس أبابا',
    'all_areas': 'جميع المناطق',
    'near_me': 'بالقرب مني',
    'adults': 'البالغون',
    'children': 'الأطفال',
    'rooms': 'الغرف',
    'ages_13_above': 'أعمار 13 فما فوق',
    'ages_2_12': 'أعمار 2-12',
    'filters': 'المرشحات',
    'sort_by': 'ترتيب حسب',
    'price_range': 'نطاق السعر',
    'star_rating': 'تقييم النجوم',
    'property_type': 'نوع العقار',
    'amenities': 'المرافق',
    'clear_all': 'مسح الكل',
    'apply_filters': 'تطبيق المرشحات',
    'become_host': 'كن مضيفًا'
  }
  // More translations can be added for other languages
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && languages[savedLang as keyof typeof languages]) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};