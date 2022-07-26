const size = {
  mobile: "512px",
  tablet: "768px",
  desktop: "1024px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export interface ProductTileProps {
  sku?: string;
  title: string;
  rating: number;
  price: number;
  category: string;
  src: string;
  className?: string;
}

export const categories = ["Essentials", "Hobbies", "Home"];
