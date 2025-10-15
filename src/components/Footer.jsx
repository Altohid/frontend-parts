import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Car className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">AutoMart</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted platform for buying and selling second-hand vehicles across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-purple-400 transition">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link to="/add-vehicle" className="text-gray-400 hover:text-purple-400 transition">
                  Sell Your Vehicle
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div>+91 98765 43210</div>
                  <div className="text-sm">Mon-Sat, 9AM-6PM</div>
                </div>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="mailto:support@automart.com" className="hover:text-purple-400 transition">
                  support@automart.com
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  AutoMart HQ,<br />
                  Mumbai, Maharashtra<br />
                  India 400001
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AutoMart. All rights reserved. Built with ❤️ by <span className="text-purple-400 font-semibold">Altohid Sheikh</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with React, Node.js, Express & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;