import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PropertyPage from "./PropertyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/property/:name" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
