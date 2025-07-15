import React, { createContext, useContext, useState, useEffect } from 'react';

export const currencies = {
  ETB: { name: 'Ethiopian Birr', symbol: 'ETB', flag: '🇪🇹' },
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  SAR: { name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  NGN: { name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  KES: { name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  UGX: { name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
  TZS: { name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  RWF: { name: 'Rwandan Franc', symbol: 'RF', flag: '🇷🇼' },
  ZAR: { name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  EGP: { name: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬' },
  MAD: { name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  TND: { name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
  GHS: { name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  XOF: { name: 'West African CFA Franc', symbol: 'CFA', flag: '🌍' },
  XAF: { name: 'Central African CFA Franc', symbol: 'CFA', flag: '🌍' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  DKK: { name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  PLN: { name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱' },
  RUB: { name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  TRY: { name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  MXN: { name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  ARS: { name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' }
};

// Mock exchange rates (in a real app, these would come from an API)
const exchangeRates = {
  ETB: 1.0,    // Base currency
  USD: 0.018,  // 1 ETB = 0.018 USD
  EUR: 0.017,
  GBP: 0.014,
  JPY: 2.7,
  CNY: 0.13,
  INR: 1.5,
  KRW: 24.1,
  SAR: 0.067,
  AED: 0.066,
  NGN: 28.4,
  KES: 2.3,
  UGX: 67.2,
  TZS: 44.8,
  RWF: 23.1,
  ZAR: 0.33,
  EGP: 0.88,
  MAD: 0.18,
  TND: 0.056,
  GHS: 0.28,
  XOF: 11.0,
  XAF: 11.0,
  CAD: 0.025,
  AUD: 0.028,
  CHF: 0.016,
  SEK: 0.20,
  NOK: 0.20,
  DKK: 0.13,
  PLN: 0.074,
  RUB: 1.67,
  TRY: 0.55,
  BRL: 0.10,
  MXN: 0.37,
  ARS: 18.2
};

interface CurrencyContextType {
  currentCurrency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (price: number, fromCurrency?: string) => number;
  formatPrice: (price: number, fromCurrency?: string) => string;
  currencies: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState('ETB');

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency && currencies[savedCurrency as keyof typeof currencies]) {
      setCurrentCurrency(savedCurrency);
    }
  }, []);

  const setCurrency = (currency: string) => {
    setCurrentCurrency(currency);
    localStorage.setItem('currency', currency);
  };

  const convertPrice = (price: number, fromCurrency: string = 'ETB'): number => {
    if (fromCurrency === currentCurrency) return price;
    
    // Convert to ETB first if needed
    const priceInETB = fromCurrency === 'ETB' ? price : price / exchangeRates[fromCurrency as keyof typeof exchangeRates];
    
    // Convert to target currency
    const convertedPrice = currentCurrency === 'ETB' ? priceInETB : priceInETB * exchangeRates[currentCurrency as keyof typeof exchangeRates];
    
    return Math.round(convertedPrice * 100) / 100;
  };

  const formatPrice = (price: number, fromCurrency: string = 'ETB'): string => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const currency = currencies[currentCurrency as keyof typeof currencies];
    
    if (currentCurrency === 'JPY' || currentCurrency === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    return `${currency.symbol}${convertedPrice.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currentCurrency, 
      setCurrency, 
      convertPrice, 
      formatPrice, 
      currencies 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};