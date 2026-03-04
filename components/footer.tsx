'use client';

import { useI18n } from './i18n-provider';
import { Globe } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  const { locale, setLocale } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === 'ko' ? 'en' : 'ko');
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Info */}
          <div className="flex flex-col gap-4 text-sm text-white/50">
            <div className="flex flex-col gap-1">
              <p>N3N Corp. <span className="mx-2 text-white/20">|</span> 41-18, Gangnam-daero 162-gil, Gangnam-gu, Seoul, Republic of Korea</p>
              <p>Tel. 82-2-761-5805 <span className="mx-2 text-white/20">|</span> Fax. 82-2-554-5803 <span className="mx-2 text-white/20">|</span> Email. business@n3n.co.kr</p>
            </div>
            <p>Copyright © 2025 N3N All Rights Reserved.</p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLocale}
            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/5 border border-white/10"
          >
            <Globe className="w-4 h-4" />
            {locale === 'ko' ? 'English' : '한국어'}
          </button>
        </div>
      </div>
    </footer>
  );
}
