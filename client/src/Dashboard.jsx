import { useEffect, useState, useRef } from "react";
import Layout from "./Layout";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { LineChart, Line } from "recharts";
import { Link } from "react-router-dom"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CalendarDays } from "lucide-react";

function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);
  const [showGoogleReviews, setShowGoogleReviews] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [flashMessage, setFlashMessage] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const calendarRef = useRef(null);
  const propertyRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const fetchReviews = () => {
    fetch("http://localhost:5000/api/reviews/hostaway")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
        setFilteredReviews(data.reviews);
      });
  };

  const fetchGoogleReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews/google");
      const data = await res.json();
      setGoogleReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch Google reviews", error);
    }
  };


  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
      if (propertyRef.current && !propertyRef.current.contains(e.target)) {
        setPropertyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (item) => {
    const { startDate, endDate } = item.selection;
    setDateRange([{ startDate, endDate, key: "selection" }]);
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setCalendarOpen(false);
    }
  };

  const applyFilters = () => {
    let result = [...reviews];

    if (selectedProperties.length > 0) {
      result = result.filter((r) => selectedProperties.includes(r.listingName));
    }

    if (filterType !== "all") {
      result = result.filter((r) => r.type === filterType);
    }

    if (selectedCategory !== "all") {
      result = result.filter((r) =>
        r.categories?.some((c) => c.category === selectedCategory)
      );
    }

    if (selectedRating !== "all") {
      const threshold = parseInt(selectedRating);
      result = result.filter((r) => (r.rating || 0) >= threshold);
    }

    if (selectedChannel !== "all") {
      result = result.filter((r) => r.channel === selectedChannel);
    }

    const { startDate, endDate } = dateRange[0];
    if (startDate && endDate) {
      result = result.filter((r) => {
        const date = new Date(r.submittedAt);
        return date >= startDate && date <= endDate;
      });
    }

    setFilteredReviews(result);
  };

  const resetFilters = () => {
    setSelectedProperties([]);
    setSelectedCategory("all");
    setSelectedRating("all");
    setFilterType("all");
    setSelectedChannel("all");
    setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
    setFilteredReviews(reviews);
  };

  const toggleApproval = async (id, newStatus) => {
    try {
      const updated = reviews.map((r) =>
        r.id === id ? { ...r, isApproved: newStatus } : r
      );
      setReviews(updated);
      setFilteredReviews(updated);

      await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      setFlashMessage("Review approval updated!");
      setTimeout(() => setFlashMessage(""), 2000);
    } catch (err) {
      console.error("Failed to update approval status:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const getAverageRatings = () => {
    const map = new Map();
    reviews.forEach((r) => {
      if (!map.has(r.listingName)) {
        map.set(r.listingName, { total: 0, count: 0 });
      }
      const entry = map.get(r.listingName);
      entry.total += r.rating || 0;
      entry.count += 1;
    });
    return Array.from(map.entries())
      .map(([name, stats]) => ({
        name,
        avg: parseFloat((stats.total / stats.count).toFixed(1)),
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 5);
  };

  const uniqueProperties = [...new Set(reviews.map((r) => r.listingName))];

  return (
    <Layout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#284E4C]">Welcome, Manager!</h2>
        {flashMessage && (
          <div className="text-green-600 text-sm mt-2">{flashMessage}</div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-[#FFF9E9] p-4 rounded-2xl shadow-lg mb-8">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <div className="relative" ref={propertyRef}>
            <button
              onClick={() => setPropertyDropdownOpen((prev) => !prev)}
              className="border rounded-md px-4 py-2 bg-white w-48 text-left text-sm flex justify-between items-center"
            >
              {selectedProperties.length > 0 ? `${selectedProperties.length} selected` : "All Properties"}
              <span className="ml-2">▼</span>
            </button>
            {propertyDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white border rounded-md shadow z-10 max-h-40 overflow-auto">
                {uniqueProperties.map((prop) => (
                  <label key={prop} className="block px-3 py-1 text-sm hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(prop)}
                      onChange={() =>
                        setSelectedProperties((prev) =>
                          prev.includes(prop)
                            ? prev.filter((p) => p !== prop)
                            : [...prev, prop]
                        )
                      }
                      className="mr-2"
                    />
                    {prop}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setCalendarOpen(true)}
              className="border rounded-md px-4 py-2 bg-white w-48 text-left text-sm flex items-center justify-between"
            >
              <span>
                {dateRange[0].startDate && dateRange[0].endDate
                  ? `${format(dateRange[0].startDate, "dd MMM")} - ${format(dateRange[0].endDate, "dd MMM")}`
                  : "Select Dates"}
              </span>
              <CalendarDays size={16} className="ml-2 text-gray-500" />
            </button>
            {calendarOpen && (
              <div className="absolute mt-2 z-10">
                <DateRange
                  locale={enUS}
                  onChange={handleDateSelect}
                  ranges={dateRange}
                  moveRangeOnFirstSelection={false}
                  showDateDisplay={false}
                  rangeColors={["#284E4C"]}
                />
              </div>
            )}
          </div>

          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="border rounded-md px-4 py-2 bg-white w-40 text-sm"
          >
            <option value="all">All Channels</option>
            <option value="Airbnb">Airbnb</option>
            <option value="Booking.com">Booking.com</option>
            <option value="VRBO">VRBO</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-md px-4 py-2 bg-white w-40 text-sm"
          >
            <option value="all">All Types</option>
            <option value="guest-to-host">Guest to Host</option>
            <option value="host-to-guest">Host to Guest</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md px-4 py-2 bg-white w-40 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="communication">Communication</option>
            <option value="respect_house_rules">House Rules</option>
          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border rounded-md px-4 py-2 bg-white w-40 text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="8">8 and above</option>
            <option value="9">9 and above</option>
            <option value="10">Perfect (10)</option>
          </select>

          <button
            onClick={applyFilters}
            className="bg-[#284E4C] hover:bg-[#1d3b39] text-white text-sm px-6 py-2 rounded-xl"
          >
            Search
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-300 hover:bg-gray-400 text-sm px-6 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Top Properties */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#284E4C] mb-4">📊 Top 5 Properties by Avg Rating</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getAverageRatings()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="avg" fill="#284E4C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Per-Property Performance */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#284E4C] mb-4">📋 Per-Property Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow rounded-xl overflow-hidden">
            <thead className="bg-[#F3F4F6] text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Property</th>
                <th className="px-4 py-2 text-left">Avg Rating</th>
                <th className="px-4 py-2 text-left">Total Reviews</th>
                <th className="px-4 py-2 text-left">% Approved</th>
                <th className="px-4 py-2 text-left">Channels</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                reviews.reduce((acc, r) => {
                  if (!acc[r.listingName]) {
                    acc[r.listingName] = {
                      totalRating: 0,
                      count: 0,
                      approved: 0,
                      channels: new Set(),
                    };
                  }
                  acc[r.listingName].totalRating += r.rating || 0;
                  acc[r.listingName].count += 1;
                  if (r.isApproved) acc[r.listingName].approved += 1;
                  acc[r.listingName].channels.add(r.channel);
                  return acc;
                }, {})
              ).map(([property, data]) => {
                const avg = (data.totalRating / data.count).toFixed(1);
                const approvalRate = ((data.approved / data.count) * 100).toFixed(0);
                const channels = Array.from(data.channels).join(", ");
                return (
                  <tr key={property} className="text-sm text-gray-800 border-t">
                    <td className="px-4 py-2">{property}</td>
                    <td className="px-4 py-2">{avg}</td>
                    <td className="px-4 py-2">{data.count}</td>
                    <td className="px-4 py-2">{approvalRate}%</td>
                    <td className="px-4 py-2">{channels}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trends Over Time */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#284E4C] mb-4">📈 Rating Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={Object.values(
              reviews.reduce((acc, r) => {
                const date = new Date(r.submittedAt).toLocaleDateString();
                if (!acc[date]) acc[date] = { date, total: 0, count: 0 };
                acc[date].total += r.rating || 0;
                acc[date].count += 1;
                return acc;
              }, {})
            ).map((d) => ({
              date: d.date,
              avg: +(d.total / d.count).toFixed(1),
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="avg" stroke="#284E4C" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recurring Issues (Low-Rated Categories) */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[#284E4C] mb-4">🚨 Recurring Issues by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(
              reviews.reduce((acc, r) => {
                r.categories?.forEach((c) => {
                  if (c.rating <= 7) {
                    acc[c.category] = (acc[c.category] || 0) + 1;
                  }   
                });
                return acc;
              }, {})
            ).map(([category, count]) => ({ category, count }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#D97706" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={() => {
            setShowGoogleReviews((prev) => !prev);
            if (!googleReviews.length) fetchGoogleReviews();
          }}
          className="inline-block px-4 py-2 bg-[#284E4C] text-white text-sm font-medium rounded-md shadow hover:bg-[#1d3b39] transition"
        >
          {showGoogleReviews ? "Hide Google Reviews" : "Show Google Reviews"}
        </button>
      </div>

      {showGoogleReviews && googleReviews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#284E4C] mb-4">
            🌍 Google Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-yellow-500 text-sm">
                    {"⭐".repeat(Math.round(review.rating || 0))}
                  </div>
                  <span className="text-xs text-gray-400">Google</span>
                </div>
                <p className="text-gray-800 text-sm italic mb-2">
                  “{review.text || "No review text"}”
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  — {review.author_name || review.author || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* Guest Reviews */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#284E4C] mb-6">📝 Guest Reviews by Property</h2>
        {Object.entries(
          filteredReviews.reduce((acc, r) => {
            if (!acc[r.listingName]) acc[r.listingName] = [];
            acc[r.listingName].push(r);
            return acc;
          }, {})
        ).map(([property, reviews]) => (
          <div key={property} className="mb-8">
            <h3 className="text-xl font-semibold text-[#284E4C] mb-2">
              <Link
                to={`/property/${encodeURIComponent(property)}`}
                className="hover:underline flex items-center gap-1"
              >
                {property}
                <span className="text-gray-400 text-base">🔗</span>
              </Link>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
                >
                  <p className="text-gray-600 mb-1 text-sm">
                    <span className="font-semibold">Guest:</span> {r.guestName}
                  </p>
                  <p className="text-gray-500 text-xs mb-1">
                    📅 Received: {new Date(r.submittedAt).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <p className="text-gray-800 text-sm italic mb-2">"{r.publicReview}"</p>
                  <div className="flex justify-between items-center">
                    <div className="text-yellow-500 text-xs">
                      {"⭐".repeat(Math.round(r.rating || 0))}
                    </div>
                    <button
                      onClick={() => toggleApproval(r.id, !r.isApproved)}
                      className={`text-xs px-2 py-1 rounded ${
                        r.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {r.isApproved ? "Approved" : "Approve"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;
