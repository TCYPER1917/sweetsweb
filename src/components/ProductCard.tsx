'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `مرحباً، أود طلب: ${product.name} - السعر: ${product.price} ${product.unit || 'شيكل'}`
  );
  const whatsappUrl = `https://wa.me/972569553350?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4A0E17] to-[#2d0a0f]">
            <span className="text-4xl text-[#D4AF37]">🍰</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#4A0E17] mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#D4AF37]">{product.price} {product.unit || '₪'}</span>
          {product.is_available ? (
            <span className="text-green-600 text-sm font-medium">متوفر</span>
          ) : (
            <span className="text-red-600 text-sm font-medium">غير متوفر</span>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
        >
          <MessageCircle size={20} />
          <span>اطلب عبر الواتساب</span>
        </a>
      </div>
    </motion.div>
  );
}