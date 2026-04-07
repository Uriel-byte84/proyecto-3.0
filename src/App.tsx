import { useState, useMemo } from 'react';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import type { Category } from './types';
import { FILTER_OPTIONS } from './types';
import './index.css';

import { AnnouncementBar } from './components/AnnouncementBar';
import { LogoBanner } from './components/LogoBanner';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { SideMenu } from './components/SideMenu';
import { ShoppingCartModal } from './components/ShoppingCartModal';
import { FloatingButtons } from './components/FloatingButtons';
import { Footer } from './components/Footer';

const ARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
});

export default function App() {
  const [mostrarWeb, setMostrarWeb] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { products, loading, error, filterProducts } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    return filterProducts(activeFilter, searchQuery);
  }, [filterProducts, activeFilter, searchQuery]);

  const handleAddToCart = (product: typeof products[0]) => {
    if (!product || product.stock <= 0) return;
    addToCart(product);
  };

  const handleConfirmOrder = (paymentMethod: string, _deliveryMethod: string) => {
    if (!cart || cart.length === 0) return;

    const esTransferencia = paymentMethod.toLowerCase().includes('transferencia');
    const descuento = esTransferencia ? total * 0.10 : 0;
    const totalFinal = total - descuento;

    let mensaje = `✨ *GRILLITO PETIT - ORDEN* ✨%0A%0A`;
    cart.forEach((item) => {
      mensaje += `- ${item.product.nombre} (x${item.quantity})%0A`;
    });

    if (descuento > 0) {
      mensaje += `%0A💰 *Descuento (10%):* -${ARS.format(descuento)}%0A`;
    }

    mensaje += `%0A✅ *TOTAL: ${ARS.format(totalFinal)}*`;

    window.open(`https://wa.me/5492236038499?text=${mensaje}`, '_blank');
    clearCart();
    setCartOpen(false);
  };

  if (!mostrarWeb) {
    return (
      <div className="landing-root min-h-screen bg-[#f2ede4] flex flex-col items-center justify-center">
        <h1 className="landing-heading text-4xl font-bold text-[#8b5e3c] mb-8">Grillito Petit</h1>
        <button className="landing-button px-8 py-4 bg-[#d4a373] text-white font-bold rounded-lg hover:bg-[#bc8a5f] transition-colors" onClick={() => setMostrarWeb(true)}>
          INGRESAR A LA TIENDA
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2ede4]">
      <AnnouncementBar />
      <LogoBanner />
      <Header cartCount={itemCount} onMenuClick={() => setMenuOpen(true)} onCartClick={() => setCartOpen(true)} />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <FilterBar
        options={FILTER_OPTIONS}
        activeFilter={activeFilter}
        onChange={(f: Category) => { setActiveFilter(f); setSearchQuery(''); }}
      />

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <p className="text-center py-20 animate-pulse text-[#8b5e3c]">Buscando prendas lindas...</p>
        ) : error ? (
          <p className="text-center py-20 text-red-500">Error al cargar: {error}</p>
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        )}
      </main>

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(cat: Category) => { setActiveFilter(cat); setMenuOpen(false); }}
      />

      <ShoppingCartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={total}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onConfirm={handleConfirmOrder}
      />

      <FloatingButtons />
      <Footer />
    </div>
  );
}
