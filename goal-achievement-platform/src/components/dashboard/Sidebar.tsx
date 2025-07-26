import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar:React.FC<Props> = ({ isOpen, toggleSidebar }) => {
    
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:static md:translate-x-0`}>
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={toggleSidebar}>
          <X />
        </button>
      </div>
      <ul className="space-y-4">
        <li><Link href="/dashboard/Editor/management" className="hover:text-blue-400">Document Editor</Link></li>
        <li><Link href="/Marketplace" className="hover:text-blue-400">MarketPlace</Link></li>
        <li><Link href="#" className="hover:text-blue-400">Leadboard </Link></li>
        <li><Link href="#" className="hover:text-blue-400">Gamification</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
