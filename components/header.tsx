'use client';

import { useI18n } from './i18n-provider';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { ShinyButton } from './ui/shiny-button';

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

function scrollToSection(href: string) {
  if (href.startsWith('#')) {
    const el = document.getElementById(href.slice(1));
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

function NavLink({ href, className, children, onClick, external }: {
  href: string; className?: string; children: React.ReactNode; onClick?: () => void; external?: boolean;
}) {
  if (external || !href.startsWith('#')) {
    return (
      <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(href);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function DesktopDropdown({ section, isLight }: { section: NavSection; isLight: boolean }) {
  const linkCls = isLight
    ? 'flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black transition-colors py-6'
    : 'flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors py-6';

  if (!section.items || section.items.length === 0) {
    return <NavLink href={section.href} className={linkCls}>{section.label}</NavLink>;
  }

  return (
    <div className="relative group/nav">
      <NavLink href={section.href} className={linkCls}>
        {section.label}
        <ChevronDown className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform" />
      </NavLink>

      <div className="absolute top-full left-0 hidden group-hover/nav:block w-56 pt-2">
        <div className={`border rounded-xl p-2 shadow-2xl ${isLight ? 'bg-white border-black/10' : 'bg-[#1C1C1E] border-white/10'}`}>
          {section.items.map((item, idx) => (
            <NavLink
              key={idx}
              href={item.href}
              external={item.external}
              className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${isLight ? 'text-black/70 hover:text-black hover:bg-black/5' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
            >
              {item.label}
            </NavLink>
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
          <NavLink href={section.href} onClick={closeMenu} className="font-medium flex-1">
            {section.label}
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-white/10 last:border-0 py-2">
      <div className="flex items-center justify-between w-full text-left py-2 text-white/80 hover:text-white">
        <NavLink href={section.href} onClick={closeMenu} className="font-medium flex-1">
          {section.label}
        </NavLink>
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
                <NavLink
                  key={idx}
                  href={item.href}
                  external={item.external}
                  onClick={closeMenu}
                  className="block text-sm text-white/60 hover:text-white py-1"
                >
                  {item.label}
                </NavLink>
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
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const darkSection = document.getElementById('region');
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        setIsLight(rect.bottom < 64);
      }
    };
    checkTheme();
    window.addEventListener('scroll', checkTheme, { passive: true });
    return () => window.removeEventListener('scroll', checkTheme);
  }, []);

  const navSections = [
    t.nav.company,
    t.nav.products,
    t.nav.ai_infrastructure,
    t.nav.pricing,
    t.nav.support,
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isLight
          ? 'border-black/10 bg-white/90'
          : 'border-white/10 bg-black/80'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Logo light={isLight} />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navSections.map((section, idx) => (
            <DesktopDropdown key={idx} section={section} isLight={isLight} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 py-4">
          <ShinyButton
            className="!py-2 !px-5 !text-sm"
            onClick={() => window.open('https://jikjicloud.io/', '_blank')}
          >
            {t.nav.console}
          </ShinyButton>
        </div>

        <button
          className={`lg:hidden py-4 transition-colors ${isLight ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'}`}
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
              <ShinyButton
                className="!py-3 !px-4 !text-sm w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.open('https://jikjicloud.io/', '_blank');
                }}
              >
                {t.nav.console}
              </ShinyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
