import { useContext } from 'react';
import { CartContext } from '../CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

// Наш "каталог" товаров (в реальности он бы приходил с сервера)
const products = [
  { id: 1, name: "Ноутбук", price: 50000, emoji: "💻" },
  { id: 2, name: "Смартфон", price: 30000, emoji: "📱" },
  { id: 3, name: "Наушники", price: 5000, emoji: "🎧" },
  { id: 4, name: "Клавиатура", price: 3000, emoji: "⌨️" },
];

function Shop() {
  // Состояние корзины (массив товаров)
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
 
  // Считаем общую сумму
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="shop-container">
      <h1>🛍️ Мини-магазин</h1>
      
      <div className="shop-layout">
        {/* Левая часть: Витрина товаров */}
        <div className="products-list">
          <h2>Товары</h2>
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <span className="product-emoji">{product.emoji}</span>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.price} ₽</p>
                </div>
              </div>
              <button onClick={() => addToCart(product)}>В корзину</button>
            </div>
          ))}
        </div>

        {/* Правая часть: Корзина */}
        <div className="cart-list">
          <h2>Корзина</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Корзина пуста</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.emoji} {item.name}</span>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>
                        <FaMinus />
                        </button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>
                        <FaPlus />
                        </button>
                    </div>
                  <span>{(item.price * item.quantity)} ₽</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
              <div className="cart-total">
                <strong>Итого:</strong>
                <strong>{totalPrice} ₽</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;