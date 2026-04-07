import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  if (!product) return null;

  const imagePath = product.media_url || product.imagen || product.archivo || '/assets/products/logo.jpeg';
  const isVideo = product.es_video || product.tipo === 'video' || imagePath.toLowerCase().endsWith('.mp4');

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#eaddcf] hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="aspect-square relative overflow-hidden bg-[#000]">
        {isVideo ? (
          <video
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline
            key={imagePath}
          >
            <source src={imagePath} type="video/mp4" />
          </video>
        ) : (
          <img
            src={imagePath}
            alt={product.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/products/logo.jpeg';
            }}
          />
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[10px] uppercase tracking-wider text-[#d4a373] font-bold">
            {product.categoria}
          </span>
        </div>

        <h3 className="text-[#4a3728] font-bold text-sm mb-1 line-clamp-1">
          {product.nombre}
        </h3>

        <p className="text-[#8b5e3c] text-[11px] mb-3 line-clamp-2 leading-tight h-8">
          {product.descripcion || 'Sin descripción disponible'}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-[#8b5e3c]">
            ${new Intl.NumberFormat('es-AR').format(product.precio)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${product.stock > 0
                ? 'bg-[#d4a373] text-white hover:bg-[#bc8a5f]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {product.stock > 0 ? 'Agregar' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
