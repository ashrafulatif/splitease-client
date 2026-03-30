export interface ICreateHouse {
  name: string;
  description: string;
}

export interface IAddMember {
  houseId: string;
  name: string;
  email: string;
}

export interface IHouseUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface IHouseMember {
  id: string;
  userId: string;
  houseId: string;
  role: "MANAGER" | "MEMBER";
  createdAt: string;
  user: IHouseUser;
}

export interface IHouseCount {
  members: number;
  months: number;
  deposits: number;
  expenses: number;
  meals: number;
}

export interface IHouse {
  id: string;
  name: string;
  description: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator: IHouseUser;
  members: IHouseMember[];
  _count: IHouseCount;
}