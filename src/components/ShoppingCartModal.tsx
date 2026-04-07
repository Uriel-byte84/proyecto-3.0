import { X, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { PAYMENT_METHODS, DELIVERY_METHODS } from '../types';
import { useState } from 'react';

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onConfirm: (paymentMethod: string, deliveryMethod: string) => void;
}

export function ShoppingCartModal({
  isOpen,
  onClose,
  cart,
  total,
  onRemove,
  onUpdateQuantity,
  onConfirm,
}: ShoppingCartModalProps) {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS[0]);

  if (!isOpen) return null;

  const ARS = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  });

  const esTransferencia = paymentMethod.toLowerCase().includes('transferencia');
  const descuento = esTransferencia ? total * 0.10 : 0;
  const totalFinal = total - descuento;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg z-50 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#8b5e3c]">Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              El carrito está vacío
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  <img
                    src={item.product.media_url || item.product.imagen || item.product.archivo || '/assets/products/logo.jpeg'}
                    alt={item.product.nombre}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.product.nombre}</h3>
                    <p className="text-[#8b5e3c] font-bold">
                      {ARS.format(item.product.precio)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto p-1 hover:bg-red-100 rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Método de pago
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {PAYMENT_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Método de entrega
              </label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {DELIVERY_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{ARS.format(total)}</span>
              </div>
              {descuento > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento (10%):</span>
                  <span>-{ARS.format(descuento)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{ARS.format(totalFinal)}</span>
              </div>
            </div>

            <button
              onClick={() => onConfirm(paymentMethod, deliveryMethod)}
              className="w-full bg-[#d4a373] text-white py-3 rounded-lg font-semibold hover:bg-[#bc8a5f] transition-colors"
            >
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}
