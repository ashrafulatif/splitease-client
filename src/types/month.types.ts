export interface ICreateMonth {
  houseId: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface IMonthHouse {
  id: string;
  name: string;
  createdBy: string;
}

export interface IMonthCount {
  meals: number;
  deposits: number;
  expenses: number;
}

export interface IMonth {
  id: string;
  houseId: string;
  name: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
  house: IMonthHouse;
  _count: IMonthCount;
}