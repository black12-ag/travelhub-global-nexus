import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Globe, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function LanguageCurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { currentCurrency, setCurrency, currencies } = useCurrency();

  const currentLangData = languages[currentLanguage as keyof typeof languages];
  const currentCurrencyData = currencies[currentCurrency as keyof typeof currencies];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 px-3 flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">{currentLangData?.flag}</span>
          <DollarSign className="h-4 w-4" />
          <span className="text-sm">{currentCurrencyData?.symbol}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Language
            </h3>
            <Select value={currentLanguage} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.entries(languages).map(([code, lang]) => (
                  <SelectItem key={code} value={code}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Currency
            </h3>
            <Select value={currentCurrency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.entries(currencies).map(([code, currency]) => (
                  <SelectItem key={code} value={code}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{currency.flag}</span>
                      <span>{currency.name}</span>
                      <span className="text-gray-500">({currency.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}