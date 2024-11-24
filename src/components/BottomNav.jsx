import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, BanknotesIcon, ReceiptPercentIcon, ChartBarIcon } from '@heroicons/react/24/outline';

function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/income', icon: BanknotesIcon, label: 'Income' },
    { path: '/expenses', icon: ReceiptPercentIcon, label: 'Expenses' },
    { path: '/reports', icon: ChartBarIcon, label: 'Reports' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="btm-nav bg-base-100 border-t border-base-200"
    >
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={isActive ? 'active' : ''}
          >
            <Icon className="h-5 w-5" />
            <span className="btm-nav-label">{label}</span>
            {isActive && (
              <motion.div
                layoutId="bottomNav"
                className="absolute inset-x-0 -top-1 h-1 bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        );
      })}
    </motion.nav>
  );
}

export default BottomNav;