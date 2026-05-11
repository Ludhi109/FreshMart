import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Globe, MessageSquare, Camera, Video, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <ShoppingCart size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-text-main tracking-tight">
                Fresh<span className="text-primary">Mart</span>
              </span>
            </Link>
            <p className="text-text-muted leading-relaxed mb-6">
              Your neighborhood's favorite grocery delivery service. We bring fresh, organic, and quality groceries right to your doorstep within 30 minutes.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Camera, Video].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-text-main mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Shop', 'Categories', 'Offers', 'About Us', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-text-muted hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-text-main mb-6">Popular Categories</h4>
            <ul className="space-y-4">
              {['Fruits', 'Vegetables', 'Dairy Products', 'Bakery Items', 'Snacks & Sweets', 'Beverages'].map((item) => (
                <li key={item}>
                  <Link
                    to="/categories"
                    className="text-text-muted hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-text-main mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-text-muted">
                <MapPin className="text-primary shrink-0" size={20} />
                <span>123 Fresh Lane, Jubilee Hills, Hyderabad, India 500033</span>
              </li>
              <li className="flex gap-3 text-text-muted">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-text-muted">
                <Mail className="text-primary shrink-0" size={20} />
                <span>support@freshmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-text-muted text-sm text-center">
            © {new Date().getFullYear()} FreshMart Grocery Delivery. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
