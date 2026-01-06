
export type Network = 'MTN' | 'AIRTEL' | 'GLO';
export type Method = 'MANUAL' | 'AUTO';

export interface DataPlan {
  id: string;
  label: string;
  price: number;
}

export interface Order {
  id: string;
  network: Network;
  method: Method;
  plan: string;
  price: number;
  phoneNumber: string;
  status: 'PENDING' | 'SENT';
  createdAt: number;
}
