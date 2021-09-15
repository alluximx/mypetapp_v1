export interface ProductListProps {
  categoryId?: string;
  brandId?: string;
  name?: string;
  setBrand?: (brandId: string) => void;
}

export interface ProductCardProps {
  cover_image?: string;
  brand: string;
  name: string;
}
