# FlexLiving Reviews Dashboard 🏘️

An interactive dashboard to visualize and analyze guest reviews across FlexLiving properties. Designed for internal operations teams to monitor performance, identify trends, and optimize guest experience.

## 📌 Features

- 📊 **Top 5 Properties by Avg Rating**
- 🏘️ **Guest Reviews by Property**
- 🔎 **Filtering** by:
  - Property (All / Specific)
  - Date Range
  - Review Type
  - Review Category
  - Rating
- 📉 Dynamic charts and per-property insights
- 🌐 Responsive UI mimicking [theflex.global](https://theflex.global/) for visual consistency

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js (Express)
- **Data**: JSON Mock Data
- **Design Reference**: [FlexLiving Website](https://theflex.global)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)

### Installation

```bash
git clone https://github.com/your-username/flexliving-dashboard.git
cd flexliving-dashboard
npm install
```

### Run the App

```bash
npm run dev
```

This runs both the frontend and backend on `http://localhost:5173` and `http://localhost:3000`.

## 📂 Project Structure

```bash
/
├── backend/            # Express server
│   └── mockData.json   # Review data
├── src/
│   ├── components/     # UI components
│   ├── pages/          # Dashboard & PropertyPage
│   ├── utils/          # Helper functions
│   └── App.jsx
├── public/
├── layout.jsx
└── README.md
```

## 📷 Screenshots

![Dashboard Overview](./screenshots/dashboard.png)
![Property Page](./screenshots/property.png)

## 📈 Insights Example

- Track guest satisfaction across cities
- Identify recurring complaints
- Highlight high-performing properties
- Easily toggle views with intuitive filters

## 🎯 Assessment Goals Fulfilled

✅ UI mimics FlexLiving  
✅ Filtering, sorting, and date range support  
✅ Per-property insights  
✅ Channel-based (where data allows) filtering  
✅ Polished design with responsive layout  
✅ Easy setup and local run instructions

## 🔧 Deployment

Deployed on **Vercel**: [https://flexliving-dashboard.vercel.app](https://flexliving-dashboard.vercel.app)  
(Replace this with your actual deployed URL)

## 🧪 Test Cases & Future Improvements

### ✅ Basic Tests

- Component rendering
- Filtering functionality
- Chart updates

### 🔮 Future Improvements

- Add authentication for internal access
- Real-time data syncing with backend
- Sortable columns and advanced analytics
- Channel field enrichment (if added to dataset)

## 🙌 Author

Saad Kadri – [LinkedIn](https://www.linkedin.com/in/saadkadri) | [Portfolio](https://your-portfolio.com)
