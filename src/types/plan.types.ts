export interface ICreatePlan{
    name: string;
    price: number;
    durationDays: number;
    features: string[];
}

export interface IUpdatePlan{
    name?: string;
    price?: number;
    durationDays?: number;
    features?: string[];
}

export interface IPlan extends ICreatePlan {
    id: string;
    createdAt?: string;
    updatedAt?: string;
}