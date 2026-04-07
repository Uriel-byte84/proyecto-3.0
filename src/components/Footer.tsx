export function Footer() {
  return (
    <footer className="bg-[#4a3728] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-3">Grillito Petit</h3>
            <p className="text-sm text-gray-300">
              Ropa premium para bebés y niños
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Contacto</h3>
            <p className="text-sm text-gray-300">
              Libertad 8622, Mar del Plata<br />
              WhatsApp: +54 9 223 603-8499
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Horarios</h3>
            <p className="text-sm text-gray-300">
              Lunes a Viernes: 9:00 - 18:00<br />
              Sábados: 9:00 - 13:00
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-400">
          © 2026 Grillito Petit. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
