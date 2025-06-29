import { Product, mockProducts } from './mockProducts';
import { fitpointProducts } from './fitpointProducts';

// Combine both product datasets for a comprehensive catalog
export const allProducts: Product[] = [
  ...mockProducts,
  ...fitpointProducts
];

// Export individual datasets as well
export { mockProducts, fitpointProducts };

// Export the Product interface for easy importing
export type { Product }; 