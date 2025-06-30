'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { SignupDialog } from "@/ui/components/dialog/SignupDialog";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgba(255,255,255,0.2)] backdrop-blur-md z-100">
     <div className='max-w-7xl px-6 py-2 flex items-center justify-between mx-auto'>
         {/* Logo */}
          <div className="text-xl font-bold">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center text-gray-800 font-bold">
            <Link href="/" className="transition hover:text-[#ffffff]">Home</Link>
            <Link href="/plans" className="transition hover:text-[#ffffff]">Plan</Link>
            <Link href="#" className="transition hover:text-[#ffffff]">Map</Link>
            <Link href="/ai" className="transition hover:text-[#ffffff]">Ai</Link>
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            <SignupDialog />
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
                <Link href="#" className="text-gray-800 hover:text-black transition">Trips</Link>
                <Link href="#" className="text-gray-800 hover:text-black transition">Plan</Link>
                <Link href="#" className="text-gray-800 hover:text-black transition">More</Link>
                <button className="bg-black text-white px-4 py-2 rounded-full w-fit mt-2">
                  Sign in
                </button>
              </div>
            </div>
          )}
     </div>
    </nav>
  );
};

export default Nav;
