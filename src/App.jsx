import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";  // Import Welcome Page
import GroceryApp from "./components/GroceryApp";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckOutForm";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />   {/* Updated Default Route */}
          <Route path="/register" element={<RegisterPage />} />  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/grocery" element={<GroceryApp />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
