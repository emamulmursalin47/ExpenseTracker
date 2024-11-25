import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 pb-24 pt-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;