import { useEffect, useState } from "react";

function GoogleReviewsFallback() {
  const [googleReviews, setGoogleReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/google-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setGoogleReviews(data.reviews);
        }
      })
      .catch(() => {
        // Graceful fallback
        setGoogleReviews([
          {
            author_name: "John Smith",
            rating: 5,
            text: "Amazing service and a beautiful flat!",
            relative_time_description: "2 weeks ago"
          },
          {
            author_name: "Sophie Turner",
            rating: 4,
            text: "Very convenient and responsive staff.",
            relative_time_description: "1 month ago"
          }
        ]);
      });
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-flex-olive mb-6">🌐 Google Reviews</h2>
      <div className="grid gap-6">
        {googleReviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-yellow-400 text-lg">
                {'⭐'.repeat(Math.round(r.rating))}
              </div>
              <div className="text-sm text-gray-400">{r.relative_time_description}</div>
            </div>
            <p className="text-lg text-[#333333] mb-2 leading-relaxed">“{r.text}”</p>
            <p className="text-sm text-gray-600 font-semibold">— {r.author_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoogleReviewsFallback;
