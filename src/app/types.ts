export interface Order {
  id: string;
  customer: string;
  created: string;
  revenue: number;
  sost: string;
  price: number;
  fulfillment: string;
}

export interface UnfinishedOrder {
  id: string;
  customerName: string;
  amountOfProducts: number;
  orderVolume: number;
  sku: string;
}
