import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import Register from "./auth/Register";
import Login from "./auth/Login";
import Algolist from "./algorithms/list";
import UserPage from "./layouts/UserPage";
import LinearSearch from "./algorithms/SearchingAlgo/LinearSearch";
import './index.css'; // Tailwind

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogin ? <Login setIsLogin={setIsLogin} /> : <Register setIsLogin={setIsLogin} />} />
        <Route path="/algolist" element={<Algolist />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/algolist/linearsearch" element={<LinearSearch />} />
      </Routes>
    </Router>
  );
}

export default App;