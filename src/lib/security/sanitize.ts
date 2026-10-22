import sanitizeHtml from 'sanitize-html';

// Sanitize HTML input to prevent XSS
export function sanitize(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}

// Sanitize plain text - strip all HTML
export function sanitizeText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

// Validate and sanitize product data
export function sanitizeProduct(product: {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
}) {
  return {
    name: product.name ? sanitizeText(product.name) : '',
    description: product.description ? sanitize(product.description) : '',
    category: product.category ? sanitizeText(product.category) : '',
    price: typeof product.price === 'number' && product.price >= 0 ? product.price : 0,
    imageUrl: product.imageUrl ? sanitizeText(product.imageUrl) : '',
  };
}
