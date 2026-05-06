import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Share2, User } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-16 pb-12 px-4 md:px-12 mt-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold mb-2">Company</h3>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Press</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold mb-2">Support</h3>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-bold mb-2">Device Info</h3>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Supported Devices</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Preferences</Link>
          </div>
          
          <div className="flex flex-col space-y-6">
            <h3 className="text-white font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-playfix-red transition-all hover:scale-110">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-playfix-red transition-all hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-playfix-red transition-all hover:scale-110">
                <Share2 className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-playfix-red transition-all hover:scale-110">
                <User className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-playfix-red font-black text-xl tracking-tighter">PLAYFIX</span>
            <span className="text-gray-500 text-xs">© {currentYear} All Rights Reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-xs text-gray-500">
            <span>Region: India (English)</span>
            <span>Service Code: 998-223</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
