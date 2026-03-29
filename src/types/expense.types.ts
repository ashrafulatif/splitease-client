export interface ICreateExpense {
  monthId: string;
  houseId: string;
  type: "MEAL" | "RENT" | "GAS" | "ELECTRICITY" | "INTERNET" | "WATER" | "OTHER";
  amount: number;
  description: string;
}

export interface IUpdateExpense {
  type?: "MEAL" | "RENT" | "GAS" | "ELECTRICITY" | "INTERNET" | "WATER" | "OTHER";
  amount?: number;
  description?: string;
}

export interface IExpense {
  id: string;
  houseId: string;
  monthId: string;
  type: "MEAL" | "RENT" | "GAS" | "ELECTRICITY" | "INTERNET" | "WATER" | "OTHER";
  amount: number;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator: {
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



