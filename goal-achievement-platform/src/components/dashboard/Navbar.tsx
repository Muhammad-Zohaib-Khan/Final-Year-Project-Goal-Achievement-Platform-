import React from 'react';
import { Menu } from 'lucide-react';

interface Props {
    toggleSidebar: () => void;
}

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">MyApp</div>
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu />
      </button>
    </nav>
  );
};

export default Navbar;
