import { X } from 'lucide-react';
import type { Category } from '../types';
import { FILTER_OPTIONS } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: Category) => void;
}

export function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#8b5e3c]">Categorías</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onNavigate(option.id);
                onClose();
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
