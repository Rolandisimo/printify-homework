export interface Order {
  id: string;
  customer: string;
  created: string;
  revenue: number;
  sost: string;
  price: number;
  fulfillment: string;
}

export interface Product {
  name: string;
  sku: string;
}

export interface UnfinishedOrderWithProducts {
  products: Product[];
  id: string;
}

export interface UnfinishedOrder {
  id: string;
  customerName: string;
  amountOfProducts: number;
  orderVolume: number;
  sku: string;
}
