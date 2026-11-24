import { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const CartContext = createContext();

// Создаем провайдер (обертку)
export function CartProvider({ children }) {
  // Состояние корзины
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("my-shop-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("my-shop-cart", JSON.stringify(cart));
  }, [cart]);
  // Функция добавления
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Если товар уже есть, увеличиваем количество
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Если нет — добавляем
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Функция удаления
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // увелечение количества
  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1} : item
    ));
  };
  //уменьшаем количество
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => {
        if (item.id === id) {
            // Если количество больше 1, уменьшаем на 1. Если 1 удаляем товар.
            return item.quantity > 1
            ? { ...item, quantity: item.quantity - 1}
            : null;
        }
        return item;
    }).filter(item => item !== null)); //убираем удаление (Null)
  };

  // Возвращаем провайдер, передавая данные всем детям
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}