import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-rose-50 to-pink-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-rose-800">
                  Dream World
                </span>
                <span className="text-xs text-rose-600 -mt-1">
                  Beauty Parlour
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted beauty destination for premium services and
              treatments. We make your dreams come true with our expert care and
              attention.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 hover:bg-rose-100"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 hover:bg-rose-100"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 hover:bg-rose-100"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-rose-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">Hair Styling & Cuts</li>
              <li className="text-sm text-gray-600">Facial Treatments</li>
              <li className="text-sm text-gray-600">Makeup & Beauty</li>
              <li className="text-sm text-gray-600">Bridal Packages</li>
              <li className="text-sm text-gray-600">Spa Treatments</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  123 Beauty Street, City Center
                  <br />
                  Downtown, ST 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  <p>
                    <span style={{ fontSize: "14px" }}>
                      dreamworldparlourmail@gmail.com
                    </span>
                  </p>
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <div>Mon - Sat: 9:00 AM - 8:00 PM</div>
                  <div>Sunday: 10:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-rose-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © 2024 Dream World Beauty Parlour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
