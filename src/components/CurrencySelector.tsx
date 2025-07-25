import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DollarSign, ChevronDown } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrencyInfo = currencies[currentCurrency as keyof typeof currencies];

  const popularCurrencies = ['ETB', 'USD', 'EUR', 'GBP', 'SAR', 'AED'];
  const otherCurrencies = Object.keys(currencies).filter(
    (currency) => !popularCurrencies.includes(currency)
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="mr-1">{currentCurrencyInfo?.flag}</span>
          <span className="font-medium">{currentCurrency}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <p className="text-sm font-medium text-muted-foreground mb-2">Popular Currencies</p>
          <div className="space-y-1">
            {popularCurrencies.map((currency) => {
              const currencyInfo = currencies[currency as keyof typeof currencies];
              return (
                <DropdownMenuItem
                  key={currency}
                  onClick={() => {
                    setCurrency(currency);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex items-center justify-between ${
                    currentCurrency === currency ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{currencyInfo.flag}</span>
                    <div>
                      <p className="font-medium">{currency}</p>
                      <p className="text-sm text-muted-foreground">{currencyInfo.name}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{currencyInfo.symbol}</span>
                </DropdownMenuItem>
              );
            })}
          </div>
          
          <div className="border-t border-border my-2" />
          
          <p className="text-sm font-medium text-muted-foreground mb-2">Other Currencies</p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {otherCurrencies.map((currency) => {
              const currencyInfo = currencies[currency as keyof typeof currencies];
              return (
                <DropdownMenuItem
                  key={currency}
                  onClick={() => {
                    setCurrency(currency);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex items-center justify-between ${
                    currentCurrency === currency ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{currencyInfo.flag}</span>
                    <div>
                      <p className="font-medium">{currency}</p>
                      <p className="text-sm text-muted-foreground">{currencyInfo.name}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{currencyInfo.symbol}</span>
                </DropdownMenuItem>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
