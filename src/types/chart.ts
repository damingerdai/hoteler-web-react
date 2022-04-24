export interface RoomStatusDonut {
  totalNums: number;
  inUseNums: number;
  notUsedNums: number;
}

export type PastWeekCustomerCounts = Array<{ checkInDate: string; customerCount: number }>;
