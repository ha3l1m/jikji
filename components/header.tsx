'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './logo';

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type NavSection = {
  label: string;
  href: string;
  items?: NavItem[];
};

function DesktopDropdown({ section }: { section: NavSection }) {
  if (!section.items || section.items.length === 0) {
    return (
      <Link href={section.href} className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors py-6">
        {section.label}
      </Link>
    );
  }

  return (
    <div className="relative group/nav">
      <Link href={section.href} className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors py-6">
        {section.label}
        <ChevronDown className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform" />
      </Link>
      
      <div className="absolute top-full left-0 hidden group-hover/nav:block w-56 pt-2">
        <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-2 shadow-2xl">
          {section.items.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavSection({ section, closeMenu }: { section: NavSection; closeMenu: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!section.items || section.items.length === 0) {
    return (
      <div className="border-b border-white/10 last:border-0 py-2">
        <div className="flex items-center justify-between w-full text-left py-2 text-white/80 hover:text-white">
          <Link href={section.href} onClick={closeMenu} className="font-medium flex-1">
            {section.label}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-white/10 last:border-0 py-2">
      <div className="flex items-center justify-between w-full text-left py-2 text-white/80 hover:text-white">
        <Link href={section.href} onClick={closeMenu} className="font-medium flex-1">
          {section.label}
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-2 border-l border-white/10 ml-2">
              {section.items.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                  className="block text-sm text-white/60 hover:text-white py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navSections = [
    t.nav.company,
    t.nav.products,
    t.nav.ai_infrastructure,
    t.nav.pricing,
    t.nav.support
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navSections.map((section, idx) => (
            <DesktopDropdown key={idx} section={section} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 py-4">
          <a 
            href="https://jikjicloud.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#2C3140] text-white text-sm font-medium rounded-lg hover:bg-[#3A4052] transition-colors"
          >
            {t.nav.console}
          </a>
        </div>

        <button 
          className="lg:hidden text-white/70 hover:text-white py-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-white/10 p-6 max-h-[calc(100vh-70px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2 mb-6">
              {navSections.map((section, idx) => (
                <MobileNavSection key={idx} section={section} closeMenu={() => setIsMenuOpen(false)} />
              ))}
            </div>
            
            <div className="h-px bg-white/10 my-4" />
            
            <div className="flex flex-col gap-4">
              <a 
                href="https://jikjicloud.io/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 bg-[#2C3140] text-white text-sm font-medium rounded-lg text-center hover:bg-[#3A4052] transition-colors"
              >
                {t.nav.console}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
