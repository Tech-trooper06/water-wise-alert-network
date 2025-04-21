
import React from 'react';
import { Bell, DropletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  return (
    <header className="bg-card shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <DropletIcon className="h-8 w-8 text-water-600 mr-2" />
          <h1 className="text-xl font-semibold">WaterWise Alert Network</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Settings
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-alert-high text-white">
                3
              </Badge>
            </Button>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-water-500 flex items-center justify-center text-white font-medium">
              AR
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
