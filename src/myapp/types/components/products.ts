export interface CartCardProps {
  cover_image: string;
  id: string;
  isLastOne: boolean;
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  stock: number;
  totalItemPrice: number;
  variantName: string;
}

export interface ProductCardProps {
  cover_image?: string;
  brand: string;
  name: string;
  range_prices: {
    price__max: number;
    price__min: number;
  };
  onPress: () => void;
}

export interface ProductListProps {
  categoryId?: string;
  brandId?: string;
  name?: string;
  prices?: number[];
  setBrand?: (brandId: string) => void;
}
