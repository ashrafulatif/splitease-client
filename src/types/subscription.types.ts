import { IPlan } from "./plan.types";

export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING";

export interface IPayment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface ISubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  plan: IPlan;
  payments: IPayment[];
}
