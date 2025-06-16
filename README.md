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
git clone https://github.com/Mrutyunjay09/flexliving-reviews-dashboard.git
cd flexliving-reviews-dashboard
npm install
```

### Run the App

#### Start the Frontend (Client)

In one terminal, navigate to the `client` directory and run:

```bash
cd client
npm start
```

This runs the frontend React application at `http://localhost:3000`.

#### Start the Backend (Server)

In a second terminal, navigate to the `server` directory and run:

```bash
cd server
node index.js
```

This starts the Express backend server at `http://localhost:5000`.

## 📂 Project Structure

```bash
/
├── server/            # Express server
│   └── mockData.json  # Review data
├── client/            # React frontend
│   ├── components/    # UI components
│   ├── pages/         # Dashboard & PropertyPage
│   ├── utils/         # Helper functions
│   └── App.jsx
├── public/
├── layout.jsx
└── README.md
```

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

Mrutyunjaysinh Vaghela – [LinkedIn](https://www.linkedin.com/in/vaghelam05/)
