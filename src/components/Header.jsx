import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../context/searchContext';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

export default function Header() {
  const location = useLocation();
  const { query, setQuery } = useSearch();

  const isActive = (path) => location.pathname === path;

  const handleSearchClick = () => {
    const term = prompt("Search products:");
    if (term !== null) setQuery(term);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden sm:flex bg-white shadow px-6 sm:px-20 py-3 justify-between items-center">
        <Link to="/" className="text-xl font-bold text-green-600">QuikCart 🛒</Link>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded w-full sm:w-64"
        />

        <div className="flex gap-2">
          <Link
            to="/scan"
            className="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 text-sm"
          >
            📷 Scan
          </Link>
          <Link
            to="/cart"
            className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
          >
            View Cart
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white shadow-t border-t flex justify-around py-2 z-50">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-green-600' : 'text-gray-600'}`}>
          <AiOutlineHome size={24} />
        </Link>
        <button onClick={handleSearchClick} className="flex flex-col items-center text-gray-600">
          <AiOutlineSearch size={24} />
        </button>
        <Link to="/scan" className={`flex flex-col items-center ${isActive('/scan') ? 'text-green-600' : 'text-gray-600'}`}>
          <span>📷</span>
        </Link>
        <Link to="/cart" className={`flex flex-col items-center ${isActive('/cart') ? 'text-green-600' : 'text-gray-600'}`}>
          <AiOutlineShoppingCart size={24} />
        </Link>
      </nav>
    </>
  );
}
