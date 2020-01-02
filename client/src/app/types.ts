export interface Order {
  id: string;
  customer: string;
  created: string;
  revenue: number;
  sost: string;
  price: number;
  fulfillment: string;
}

export enum ProductSize {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  size: ProductSize;
  color: string;
  price: number;
}

export type UnfinishedOrderWithProducts = Product[];

export interface UnfinishedOrder {
  id: string;
  customer: string;
  amountOfProducts: number;
  orderVolume: number;
  sku: string;
}

export interface PreparedOrder {
  order: Order | null;
  products: Product[];
}
