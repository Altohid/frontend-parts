import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-auto bg-olx-dark text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-olx-teal/50 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-32 bg-footer-fade pointer-events-none opacity-60" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-olx-teal to-teal-600 text-white shadow-lg ring-1 ring-white/10">
                <Car className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold tracking-tight">AutoMart</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Premium pre-owned vehicle marketplace. Find your next ride or list with confidence.
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-olx-teal transition-colors ring-1 ring-white/10"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-olx-teal/90 mb-4">Browse</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/vehicles" className="text-white/75 hover:text-white font-medium transition-colors">
                  All vehicles
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-white/75 hover:text-white font-medium transition-colors">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-white/75 hover:text-white font-medium transition-colors">
                  Bikes
                </Link>
              </li>
              <li>
                <Link to="/add-vehicle" className="text-white/75 hover:text-white font-medium transition-colors">
                  Sell your vehicle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-olx-teal/90 mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/75 hover:text-white font-medium transition-colors">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/75 hover:text-white font-medium transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-white/75 hover:text-white font-medium transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 hover:text-white font-medium transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-olx-teal/90 mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-olx-teal" />
                <div>
                  <div className="font-semibold text-white">+91 98765 43210</div>
                  <div className="text-white/50 text-xs mt-0.5">Mon–Sat, 9AM–6PM</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-olx-teal" />
                <a href="mailto:support@automart.com" className="font-medium hover:text-olx-teal transition-colors">
                  support@automart.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-olx-teal" />
                <span className="leading-relaxed">AutoMart HQ, Indore, Madhya Pradesh, India 452020</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/45">
          <p>© {new Date().getFullYear()} AutoMart. All rights reserved.</p>
          <p className="text-white/35 text-xs">React · Node · Express · MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
