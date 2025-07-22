export type Product = {
  name: string;
  skinTypes: string[];
  price: string;
  image: string;
  buyNowLink: string;
};

export const products: Product[] = [
  {
    name: 'CeraVe Foaming Cleanser',
    skinTypes: ['oily', 'acne'],
    price: 'GHS 130',
    image: 'https://link-to-image',
    buyNowLink: 'https://jumia.com/cerave-foaming',
  },
  {
    name: 'The Ordinary Niacinamide 10%',
    skinTypes: ['acne', 'oily'],
    price: 'GHS 95',
    image: 'https://link-to-niacinamide',
    buyNowLink: 'https://jumia.com/niacinamide',
  },
];
