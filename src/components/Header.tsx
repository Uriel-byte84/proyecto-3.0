import { Menu, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onMenuClick: () => void;
  onCartClick: () => void;
}

export function Header({ cartCount, onMenuClick, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-[#8b5e3c]" />
        </button>

        <button
          onClick={onCartClick}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-[#8b5e3c]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#d4a373] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
