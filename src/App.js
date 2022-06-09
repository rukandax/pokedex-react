import MainHeader from "./components/MainHeader/index.js";

import HomePage from "./pages/HomePage/index.js";
import DetailPage from "./pages/DetailPage/index.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <MainHeader />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
