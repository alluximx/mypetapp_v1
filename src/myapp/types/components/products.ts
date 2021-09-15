export interface ProductCardProps {
  cover_image?: string;
  brand: string;
  name: string;
  onPress: () => void;
}

export interface ProductListProps {
  categoryId?: string;
  brandId?: string;
  name?: string;
  prices?: number[];
  setBrand?: (brandId: string) => void;
}
