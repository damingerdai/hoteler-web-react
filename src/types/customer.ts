export type Gender = 'F' | 'M' | 'N';

export interface Customer {
  id?: number;
  name: string;
  gender: Gender;
  cardId: string;
  phone: number;
}

export type Customers = Customer[];
