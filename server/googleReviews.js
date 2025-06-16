const express = require("express");
const router = express.Router();

// ✅ MOCK REVIEWS (No external API call)
const mockGoogleReviews = [
  {
    author_name: "John Doe",
    rating: 5,
    text: "Fantastic stay! The apartment was spotless.",
    relative_time_description: "2 weeks ago",
  },
  {
    author_name: "Jane Smith",
    rating: 4,
    text: "Great location, just a bit noisy at night.",
    relative_time_description: "1 month ago",
  },
  {
    author_name: "Alex Johnson",
    rating: 3,
    text: "Average experience, but responsive host.",
    relative_time_description: "3 months ago",
  },
];

router.get("/google", async (req, res) => {
  res.json({ reviews: mockGoogleReviews });
});

module.exports = router;
