import { MessageCircle, Instagram } from 'lucide-react';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
      <a
        href="https://wa.me/5492236038499"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      >
        <Instagram className="w-6 h-6" />
      </a>
    </div>
  );
}
