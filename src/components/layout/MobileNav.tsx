
import React, { useState } from 'react';
import { Gauge, DropletIcon, Database, Monitor, Smartphone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, title, active = false, onClick }: NavItemProps) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center p-3 rounded-md transition-colors text-left",
          active 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted text-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </button>
    </li>
  );
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
      <div className="grid grid-cols-5 h-16">
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <Gauge className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <DropletIcon className="h-5 w-5" />
          <span className="text-xs mt-1">Quality</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <Database className="h-5 w-5" />
          <span className="text-xs mt-1">History</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
          <Monitor className="h-5 w-5" />
          <span className="text-xs mt-1">Status</span>
        </Button>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center justify-center rounded-none h-full">
              <Menu className="h-5 w-5" />
              <span className="text-xs mt-1">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav>
              <ul className="space-y-2">
                <NavItem 
                  icon={<Gauge className="h-5 w-5" />} 
                  title="Dashboard" 
                  active 
                  onClick={() => setOpen(false)}
                />
                <NavItem 
                  icon={<DropletIcon className="h-5 w-5" />} 
                  title="Water Quality" 
                  onClick={() => setOpen(false)}
                />
                <NavItem 
                  icon={<Database className="h-5 w-5" />} 
                  title="Data History" 
                  onClick={() => setOpen(false)}
                />
                <NavItem 
                  icon={<Monitor className="h-5 w-5" />} 
                  title="System Status" 
                  onClick={() => setOpen(false)}
                />
                <NavItem 
                  icon={<Smartphone className="h-5 w-5" />} 
                  title="Mobile Alerts" 
                  onClick={() => setOpen(false)}
                />
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;
