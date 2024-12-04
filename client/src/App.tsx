import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Menu from './pages/Menu';
import OrderHistory from './pages/OrderHistory';
import Orders from './pages/Orders';
import Stock from './pages/Stock';
import UpdateMenu from './pages/UpdateMenu';
import { CartProvider } from './context/CartContext'; // Importera CartProvider
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/Admin';

const App = () => {
  return (
    <CartProvider>
      {/* Omslut appen med CartProvider */}
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<About />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/updatemenu" element={<UpdateMenu />} />
          </Routes>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
};

export default App;
