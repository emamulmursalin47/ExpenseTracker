import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-base-100 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            ExpenseTracker
          </Link>
          <Link to="/profile" className="p-2">
            <UserCircleIcon className="h-6 w-6 text-gray-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;