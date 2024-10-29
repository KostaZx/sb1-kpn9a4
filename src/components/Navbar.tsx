import { Link } from 'react-router-dom';
import { useCart } from '../stores/cart';

export default function Navbar() {
  const itemCount = useCart((state) => state.itemCount);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Store
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/categories" className="text-gray-600 hover:text-blue-600">
              Categories
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}