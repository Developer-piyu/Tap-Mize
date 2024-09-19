import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage/AdminPage";
import UserProfilePage from "./Pages/UserProfilePage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the route for AdminPage */}
          <Route path="/" element={<AdminPage />} />
          
          {/* Define the route for UserProfilePage */}
          <Route path="/profile/:userId" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
