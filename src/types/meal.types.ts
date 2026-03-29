export interface IMeal{
    monthId: string,
    houseId: string,
    date: string,
    mealType: "BREAKFAST" | "LUNCH" | "DINNER"
}

export interface IUpdateMeal{
    date?: string,
    mealType?: "BREAKFAST" | "LUNCH" | "DINNER"
}