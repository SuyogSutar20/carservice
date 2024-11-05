import React from 'react';

function Cart({ cart, removeFromCart }) {
  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total quantity of items in the cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => {
      const quantity = item?.quantity !== undefined ? parseInt(item.quantity, 10) : 0;
      if (isNaN(quantity)) {
        console.warn(`Quantity is missing or undefined for item: ${item?.productName}`);
      }
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);
  };

  console.log("Cart contents:", cart);
  const totalItems = calculateTotalItems();
  const totalPrice = calculateTotalPrice();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  if (!cart || cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={item.productImage}
                alt={item.productName}
                style={{ width: '100px', height: '100px', marginRight: '20px' }}
              />
              <div>
                <h4>{item.productName}</h4>
                <p>{item.productDescription}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{parseFloat(item.price).toFixed(2)} each</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
