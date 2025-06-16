// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const googleReviewsRoute = require("./googleReviews");
const mockDataPath = path.join(__dirname, "mockData.json");

app.use(cors());
app.use(express.json());
app.use("/api/reviews", googleReviewsRoute);

// GET normalized reviews
app.get("/api/reviews/hostaway", (req, res) => {
  const rawData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));
  const normalized = rawData.result.map((r) => ({
    id: r.id,
    guestName: r.guestName,
    listingName: r.listingName,
    type: r.type,
    status: r.status,
    rating: r.rating || avg(r.reviewCategory),
    categories: r.reviewCategory,
    submittedAt: r.submittedAt,
    publicReview: r.publicReview,
    isApproved: r.isApproved || false,
    channel: r.channel
  }));
  res.json({ reviews: normalized });
});

// PUT route to update isApproved
app.put("/api/reviews/:id/approve", (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    const file = fs.readFileSync(mockDataPath, "utf-8");
    const data = JSON.parse(file);

    const index = data.result.findIndex((r) => r.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    data.result[index].isApproved = isApproved;
    fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2));

    res.json({ success: true, updatedReview: data.result[index] });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function for average rating
function avg(arr) {
  if (!arr || !arr.length) return null;
  const sum = arr.reduce((a, c) => a + c.rating, 0);
  return (sum / arr.length).toFixed(1);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
