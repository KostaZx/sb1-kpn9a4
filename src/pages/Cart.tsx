import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Cart() {
  const [basketId] = useState(() => localStorage.getItem('basketId'));
  const { data: cart, isLoading } = useQuery(
    ['cart', basketId],
    async () => {
      if (!basketId) return null;
      const { data } = await axios.get(`${import.meta.env.VITE_TEBEX_API_URL}/basket/${basketId}`);
      return data;
    },
    { enabled: !!basketId }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!basketId || !cart?.items?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Add some awesome items to get started!</p>
      </div>
    );
  }

  const total = cart.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.items.map((item: CartItem) => (
            <div key={item.id} className="p-6 flex items-center">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="text-red-500 hover:text-red-600"
                  onClick={() => {
                    // TODO: Implement remove item functionality
                    console.log('Remove item:', item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${(total / 100).toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => {
              // TODO: Implement checkout functionality
              console.log('Proceed to checkout');
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}