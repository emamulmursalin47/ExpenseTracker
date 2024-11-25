import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ArrowsRightLeftIcon, 
  PlusIcon,
  ChartBarIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';

function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/transactions', icon: ArrowsRightLeftIcon, label: 'Transactions' },
    { path: '/add', icon: PlusIcon, label: 'Add' },
    { path: '/budget', icon: ChartBarIcon, label: 'Budget' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white pb-safe">
      <div className="h-16 flex items-center justify-around px-4 border-t border-gray-200">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          if (label === 'Add') {
            return (
              <Link
                key={path}
                to={path}
                className="relative -top-6"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center"
            >
              <div className={`p-2 rounded-xl transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className={`text-xs ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;