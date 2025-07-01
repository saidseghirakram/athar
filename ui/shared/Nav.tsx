'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { AuthDialog } from "@/ui/components/dialog/AuthDialog";
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atom/auth'; // adjust path as needed

const languages = [
  { code: 'ar', label: 'AR' },
  { code: 'SP', label: 'SP' },
  { code: 'en', label: 'EN' },
];

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token] = useAtom(tokenAtom);
  const [lang, setLang] = useState('en');

  const handleLangChange = (code: string) => setLang(code);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.2)] backdrop-blur-md z-100">
     <div className='max-w-7xl px-6 py-2 flex items-center justify-between mx-auto'>
         {/* Logo */}
          <div className="text-xl font-bold">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center text-gray-800 font-bold">
            <Link href="/" className="transition hover:text-[#ffffff]">Home</Link>
            <Link href="/plans" className="transition hover:text-[#ffffff]">Plan</Link>
            <Link href="/discover" className="transition hover:text-[#ffffff]">Map</Link>
            <Link href="/ai" className="transition hover:text-[#ffffff]">Ai</Link>
            {/* Language Toggle */}
            <div className="flex items-center space-x-2 ml-4">
              <Globe className="w-5 h-5" />
              {languages.map(l => (
                <button
                  key={l.code}
                  className={`px-2 py-1 rounded transition-all duration-300 transform
                    ${lang === l.code ? 'bg-green-600 text-white scale-110' : 'text-gray-800 bg-transparent hover:bg-gray-200'}
                  `}
                  onClick={() => handleLangChange(l.code)}
                  style={{ outline: 'none' }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            {token ? (
              <button className="bg-green-600 text-white px-4 py-2 rounded-full w-fit mt-2">
                Profile
              </button>
            ) : (
              <AuthDialog />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 md:hidden z-50">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-800 hover:text-black transition">Home</Link>
                <Link href="/plans" className="text-gray-800 hover:text-black transition">Plan</Link>
                <Link href="/discover" className="text-gray-800 hover:text-black transition">Map</Link>
                <Link href="/ai" className="text-gray-800 hover:text-black transition">Ai</Link>
                {/* Language Toggle */}
                <div className="flex items-center space-x-2 mt-2">
                  <Globe className="w-5 h-5" />
                  {languages.map(l => (
                    <button
                      key={l.code}
                      className={`px-2 py-1 rounded transition-all duration-300 transform
                        ${lang === l.code ? 'bg-green-600 text-white scale-110' : 'text-gray-800 bg-transparent hover:bg-gray-200'}
                      `}
                      onClick={() => handleLangChange(l.code)}
                      style={{ outline: 'none' }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                {token ? (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full w-fit mt-2">
                    Profile
                  </button>
                ) : (
                  <AuthDialog />
                )}
              </div>
            </div>
          )}
     </div>
    </nav>
  );
};

export default Nav;
