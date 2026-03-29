export interface ICreateDepositPayload {
  userId: string;
  houseId: string;
  monthId: string;
  amount: number;
  note?: string;
}

export interface IUpdateDepositPayload {
  amount?: number;
  note?: string;
}

export interface IDeposit {
  id: string;
  houseId: string;
  monthId: string;
  userId: string;
  amount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  house: {
    id: string;
    name: string;
    createdBy: string;
  };
  month: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    isClosed: boolean;
  };
}