/** @format */
"use client";
import React from "react";
import { ContactDialog } from "../components/dialog/ContactDialog";

function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TravelShare</h3>
            <p className="text-gray-400 mb-4">
              Making travel more accessible, social, and affordable.
            </p>
            <ContactDialog />
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  Safety
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  Support
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white cursor-pointer">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <i className="fab fa-instagram"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>Â© 2025 TravelShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
