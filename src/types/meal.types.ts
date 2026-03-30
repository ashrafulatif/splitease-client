export interface IMeal {
  monthId: string;
  houseId: string;
  userId: string;
  date: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER";
}

export interface IUpdateMeal {
  date?: string;
  mealType?: "BREAKFAST" | "LUNCH" | "DINNER";
}

export interface IMealUser {
  id: string;
  name: string;
  email: string;
}

export interface IMealRecord {
  id: string;
  userId: string;
  houseId: string;
  monthId: string;
  date: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER";
  createdAt: string;
  updatedAt: string;
  user: IMealUser;
}