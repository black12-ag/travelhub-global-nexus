import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguageInfo = languages[currentLanguage as keyof typeof languages];

  const popularLanguages = ['en', 'am', 'or', 'ar', 'fr', 'es'];
  const otherLanguages = Object.keys(languages).filter(
    (lang) => !popularLanguages.includes(lang)
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
          <Globe className="h-4 w-4 mr-2" />
          <span className="mr-1">{currentLanguageInfo?.flag}</span>
          <span className="font-medium">{currentLanguage.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <p className="text-sm font-medium text-muted-foreground mb-2">Popular Languages</p>
          <div className="space-y-1">
            {popularLanguages.map((lang) => {
              const languageInfo = languages[lang as keyof typeof languages];
              return (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex items-center justify-between ${
                    currentLanguage === lang ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{languageInfo.flag}</span>
                    <div>
                      <p className="font-medium">{lang.toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">{languageInfo.name}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </div>
          
          <div className="border-t border-border my-2" />
          
          <p className="text-sm font-medium text-muted-foreground mb-2">Other Languages</p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {otherLanguages.map((lang) => {
              const languageInfo = languages[lang as keyof typeof languages];
              return (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex items-center justify-between ${
                    currentLanguage === lang ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{languageInfo.flag}</span>
                    <div>
                      <p className="font-medium">{lang.toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">{languageInfo.name}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
