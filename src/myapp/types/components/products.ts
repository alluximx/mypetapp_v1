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
