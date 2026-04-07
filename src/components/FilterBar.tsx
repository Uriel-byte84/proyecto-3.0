import type { Category, FilterOption } from '../types';

interface FilterBarProps {
  options: ReadonlyArray<FilterOption>;
  activeFilter: Category;
  onChange: (filter: Category) => void;
}

export function FilterBar({ options, activeFilter, onChange }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === option.id
                  ? 'bg-[#d4a373] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
