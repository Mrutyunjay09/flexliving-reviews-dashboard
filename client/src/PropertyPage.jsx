import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import {
  Building2,
  Info,
  BookOpen,
  Mail,
  Globe,
  ChevronDown,
  DollarSign,
} from "lucide-react";


Modal.setAppElement('#root');

function PropertyPage() {
  const { name } = useParams();
  const [approved, setApproved] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("approved")) || [];
    const filtered = saved.filter(
      (r) => r.listingName.toLowerCase() === name.toLowerCase()
    );
    setApproved(filtered);
  }, [name]);

  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#284E4C]">
      {/* Nav Bar */}
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link to="/" className="text-sm text-[#284E4C] hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Main Image */}
          <div className="md:col-span-2">
            <img
              src="https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-Ni6j5Ge3XpzGzPhlETwI--aiGMBN28uKEWJc8zNiQQgA-6626522b35ba1"
              alt="Main"
              className="rounded-xl w-full object-cover cursor-pointer"
              onClick={() => openModal("https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-Ni6j5Ge3XpzGzPhlETwI--aiGMBN28uKEWJc8zNiQQgA-6626522b35ba1")}
              onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x500?text=Image+Unavailable";
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-2">
            {[
              "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-l6QSJioxxrxGGp4jabOXx8G2jCshYQ28455KN-JkfYw-66264a54578d6",
              "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-MxGwnvxtBSbj3uSsQ8Uhe9f9hht1qPpEWDEhK2wH8eg-662658d4ec603",
              "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-f5QOjZdRIbGvCac-QpUXFSWKT0b7nuT--MYDg--ljlu7c-6626522a3e09f",
              "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/23248-118758-amVoAoAmjcCqO1njC5Q2fOt6o7K3UxtlpegfKGMUtQY-66265228de9b8",
            ].map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Thumb ${i + 1}`}
                className="rounded-xl w-full object-cover cursor-pointer"
                onClick={() => openModal(url)}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Unavailable";
                }}
              />
            ))}
          </div>
        </div>

        {/* Title + Stats */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{name.replace(/-/g, ' ')}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <span>👥 5 guests</span>
            <span>🛏️ 2 bedrooms</span>
            <span>🚰 2 bathrooms</span>
            <span>🛌 3 beds</span>
          </div>
        </div>

        {/* About + Book Your Stay */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">About this property</h2>
              <p className="text-gray-700">
                This spacious apartment is perfect for anyone looking for a comfortable and convenient place to stay. Located in a vibrant area, it offers great access to transportation and local attractions.
              </p>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-gray-700">
                <span>📺 Cable TV</span>
                <span>🌐 Internet</span>
                <span>📶 Wireless</span>
                <span>🍳 Kitchen</span>
                <span>🧺 Washing Machine</span>
                <span>🛗 Elevator</span>
                <span>💇‍♂️ Hair Dryer</span>
                <span>🔥 Heating</span>
                <span>🚨 Smoke Detector</span>
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Stay Policies</h2>
              <div className="bg-[#f4f6f1] p-4 rounded mb-4">
                <p className="font-semibold">⏰ Check-in & Check-out</p>
                <div className="flex justify-between mt-2">
                  <span>Check-in time: <strong>3:00 PM</strong></span>
                  <span>Check-out time: <strong>10:00 AM</strong></span>
                </div>
              </div>
              <div className="bg-[#f4f6f1] p-4 rounded mb-4">
                <p className="font-semibold">📋 House Rules</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <span>🚭 No smoking</span>
                  <span>🐾 No pets</span>
                  <span>🎉 No parties or events</span>
                  <span>💰 Security deposit required</span>
                </div>
              </div>
              <div className="bg-[#f4f6f1] p-4 rounded">
                <p className="font-semibold">📆 Cancellation Policy</p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                  <li>For stays less than 28 days: Full refund up to 14 days before check-in.</li>
                  <li>For stays 28 days or more: Full refund up to 30 days before check-in.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Book Your Stay */}
          <div className="sticky top-24 self-start w-full max-w-xs hidden lg:block">
            <div className="bg-white shadow-lg rounded-xl">
              <div className="bg-[#284E4C] text-white px-6 py-4">
                <h2 className="text-lg font-semibold">Book your stay</h2>
                <p className="text-sm opacity-80">Select dates to see the total price</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-[#F4F4EF] text-sm w-full">
                    <span className="mr-2 text-gray-500">📅</span>
                    <input type="text" placeholder="Select dates" className="bg-transparent outline-none w-full" />
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 bg-[#F4F4EF] text-sm w-20">
                    <span className="mr-2 text-gray-500">👤</span>
                    <select className="bg-transparent outline-none w-full">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-[#8DA59B] text-white py-2 rounded font-medium flex items-center justify-center gap-2">
                  📅 Check availability
                </button>
                <button className="w-full border border-gray-300 py-2 rounded font-medium flex items-center justify-center gap-2 text-[#284E4C]">
                  💬 Send Inquiry
                </button>
                <p className="text-xs text-center text-gray-500">⚡ Instant confirmation</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Guest Reviews */}
        <div className="bg-white shadow rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">📄 Guest Reviews ({approved.length})</h2>
          {approved.length === 0 ? (
            <p className="text-gray-500 italic">No approved reviews yet for this property.</p>
          ) : (
            <div className="grid gap-4">
              {approved.map((r) => (
                <div
                  key={r.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-yellow-400 text-lg">
                      {"\u2b50".repeat(Math.round(r.rating || 0))}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(r.submittedAt).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <p className="text-gray-800 italic mb-1">"{r.publicReview}"</p>
                  <p className="text-sm text-gray-600">— {r.guestName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        className="bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl"
      >
        <div className="flex justify-end mb-2">
          <button onClick={closeModal} className="text-xl font-bold text-gray-600">✕</button>
        </div>
        <img src={selectedImage} alt="Preview" className="w-full h-auto rounded" />
      </Modal>
    </div>
  );
}

export default PropertyPage;
