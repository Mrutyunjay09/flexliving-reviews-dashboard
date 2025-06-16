import {
  Building2,
  Info,
  BookOpen,
  Mail,
  Globe,
  ChevronDown,
  DollarSign,
} from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#FFFDF6] text-[#284E4C] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#284E4C] text-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-semibold">
            <span className="text-2xl">🏠</span> the flex.
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            {/* Landlords Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:underline">
                <Building2 size={16} /> Landlords <ChevronDown size={14} />
              </button>
              <div className="absolute hidden group-hover:block bg-white text-[#284E4C] mt-2 rounded shadow z-10 min-w-[120px]">
                <a href="https://theflex.global/london" className="block px-4 py-2 hover:bg-gray-100">London</a>
                <a href="https://theflex.global/paris" className="block px-4 py-2 hover:bg-gray-100">Paris</a>
                <a href="https://theflex.global/algiers" className="block px-4 py-2 hover:bg-gray-100">Algiers</a>
              </div>
            </div>

            <a href="https://theflex.global/about-us" className="flex items-center gap-1 hover:underline">
              <Info size={16} /> About Us
            </a>

            <a href="https://theflex.global/careers" className="flex items-center gap-1 hover:underline">
              <BookOpen size={16} /> Careers
            </a>

            <a href="https://theflex.global/contact" className="flex items-center gap-1 hover:underline">
              <Mail size={16} /> Contact
            </a>

            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:underline">
                <span className="text-xs font-bold">GB</span> English <ChevronDown size={14} />
              </button>
              <div className="absolute hidden group-hover:block bg-white text-[#284E4C] mt-2 rounded shadow z-10 min-w-[120px]">
                <a className="block px-4 py-2 hover:bg-gray-100">English</a>
                <a className="block px-4 py-2 hover:bg-gray-100">French</a>
                <a className="block px-4 py-2 hover:bg-gray-100">Spanish</a>
                <a className="block px-4 py-2 hover:bg-gray-100">Chinese</a>
              </div>
            </div>

            {/* Currency Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:underline">
                <DollarSign size={16} /> USD <ChevronDown size={14} />
              </button>
              <div className="absolute hidden group-hover:block bg-white text-[#284E4C] mt-2 rounded shadow z-10 min-w-[100px]">
                <a className="block px-4 py-2 hover:bg-gray-100">USD</a>
                <a className="block px-4 py-2 hover:bg-gray-100">EUR</a>
                <a className="block px-4 py-2 hover:bg-gray-100">GBP</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#284E4C] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Column 1: Join The Flex */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Join The Flex</h3>
              <p className="text-gray-300 mb-6">
                Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
              </p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded text-sm placeholder:text-gray-400 w-full" placeholder="First name" />
                <input className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded text-sm placeholder:text-gray-400 w-full" placeholder="Last name" />
              </div>
              <input className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded text-sm placeholder:text-gray-400 w-full" placeholder="Email address" />
              <div className="flex gap-2">
                <select className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded text-sm w-[120px]">
                  <option>🇬🇧 +44</option>
                  <option>🇩🇿 +213</option>
                  <option>🇫🇷 +33</option>
                </select>
                <input className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded text-sm placeholder:text-gray-400 w-full" placeholder="Phone number" />
              </div>
              <button type="submit" className="w-full bg-white text-[#284E4C] py-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                <span>📨</span> Subscribe
              </button>
            </form>
          </div>

          {/* Column 2: About */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4">The Flex</h3>
            <p className="text-gray-300 text-sm">
              Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.
            </p>
            <div className="flex gap-4 text-white mt-4 text-lg">
              <a href="https://www.facebook.com/theflexliving/" target="_blank">📘</a>
              <a href="https://www.instagram.com/theflex.global" target="_blank">📸</a>
              <a href="https://www.linkedin.com/company/theflexliving" target="_blank">🔗</a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4">Locations</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>London</li>
              <li>Paris</li>
              <li>Algiers</li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <p className="font-medium">📞 Support Numbers</p>
                <p>🇬🇧 UK: +44 77 2374 5646</p>
                <p>🇩🇿 Algeria: +33 7 57 59 22 41</p>
                <p>🇫🇷 France: +33 6 44 64 57 17</p>
              </li>
              <li className="flex items-center gap-2">
                ✉️ <a href="mailto:info@theflex.global" className="hover:text-white">info@theflex.global</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-300 mt-10">
          © 2025 The Flex. All rights reserved.
        </div>
      </footer>


    </div>
  );
};

export default Layout;
