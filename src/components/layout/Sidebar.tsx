
import React from 'react';
import { Gauge, DropletIcon, Database, Monitor, Smartphone, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
}

const NavItem = ({ icon, title, to }: NavItemProps) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center p-3 rounded-md transition-colors",
          active 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted text-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen hidden lg:block bg-card border-r fixed left-0 top-0 bottom-0 pt-16">
      <div className="p-4">
        <nav>
          <ul className="space-y-2">
            <NavItem 
              icon={<Gauge className="h-5 w-5" />} 
              title="Dashboard" 
              to="/"
            />
            <NavItem 
              icon={<Package className="h-5 w-5" />} 
              title="Material Tracking" 
              to="/material-tracking"
            />
            <NavItem 
              icon={<DropletIcon className="h-5 w-5" />} 
              title="Water Quality" 
              to="/water-quality"
            />
            <NavItem 
              icon={<Database className="h-5 w-5" />} 
              title="Data History" 
              to="/data-history"
            />
            <NavItem 
              icon={<Monitor className="h-5 w-5" />} 
              title="System Status" 
              to="/system-status"
            />
            <NavItem 
              icon={<Smartphone className="h-5 w-5" />} 
              title="Mobile Alerts" 
              to="/mobile-alerts"
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
