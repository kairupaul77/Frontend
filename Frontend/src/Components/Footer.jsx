import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">About Us</h3>
          <p className="text-xs">
            We are a team of passionate food lovers dedicated to bringing you
            the best dining experience.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/home" className="hover:text-blue-400 transition text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-blue-400 transition text-sm">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-400 transition text-sm">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-blue-400 transition text-sm">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/terms" className="hover:text-blue-400 transition text-sm">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-400 transition text-sm">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-4 border-t border-gray-700 text-center pt-2">
        <p className="text-xs">&copy; {new Date().getFullYear()} Book-A-Meal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
