import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-red shadow px-20 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-green-600">QuikCart 🛒</Link>
      <Link
  to="/scan"
  className=" bottom-4 right-20 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
>
  📷 Scan
</Link>
      <Link
        to="/cart"
        className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50"
      >
        View Cart
      </Link>
     


    </header>
  );
}
