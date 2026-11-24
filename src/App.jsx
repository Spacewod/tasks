import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaTasks, FaShoppingCart, } from 'react-icons/fa';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { CartContext } from './CartContext';
import Home from './pages/Home';
import About from './pages/About'; // Убедись, что имя файла с большой буквы
import Todo from './pages/Todo';
import Shop from './pages/Shop';
import './App.css';

// 1. Создаем компонент, который будет ВНУТРИ роутера
function AppContent() {
  const location = useLocation(); // ✅ Теперь это работает
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  return (
    <div className="app">
       <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
       </button>
      <div className="content">
        <div key={location.pathname} className="page-transition">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todo" element={<Todo />} />
            <Route path='/shop' element={<Shop />} />
          </Routes>
        </div>
      </div>

      <nav className="navbar">
        <Link to="/"> 
        <FaHome /> Главная</Link>
        <Link to="/shop">
        <FaShoppingCart /> Магазин {cart.length > 0 && `(${cart.length})`}
        </Link>
        <Link to="/about">
        <FaInfoCircle /> О проекте</Link>
        <Link to="/todo">
        <FaTasks /> Мои задачи</Link>
      </nav>
    </div>
  );
}

// 2. Главный App просто оборачивает его в BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;