
import React from 'react';
import { Gauge, DropletIcon, Database, Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}

const NavItem = ({ icon, title, active = false }: NavItemProps) => {
  return (
    <li>
      <a
        href="#"
        className={cn(
          "flex items-center p-3 rounded-md transition-colors",
          active 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted text-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </a>
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
              active 
            />
            <NavItem 
              icon={<DropletIcon className="h-5 w-5" />} 
              title="Water Quality" 
            />
            <NavItem 
              icon={<Database className="h-5 w-5" />} 
              title="Data History" 
            />
            <NavItem 
              icon={<Monitor className="h-5 w-5" />} 
              title="System Status" 
            />
            <NavItem 
              icon={<Smartphone className="h-5 w-5" />} 
              title="Mobile Alerts" 
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
