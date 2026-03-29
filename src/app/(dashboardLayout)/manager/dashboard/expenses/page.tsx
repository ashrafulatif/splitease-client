import { Metadata } from "next";
import { getMyHouseAction } from "../house/_action";
import { getHouseMonthsAction } from "../months/_action";
import { getExpensesByMonthAction } from "./_action";
import ExpensesView from "@/components/module/Manager/ExpensesComponent/ExpensesView";

const ExpensesPage = async (props: { searchParams: Promise<{ house?: string; month?: string }> }) => {
  const searchParams = await props.searchParams;
  
  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];
  
  const selectedHouseId = searchParams?.house || houses[0]?.id;

  let months = [];
  if (selectedHouseId) {
    const monthsRes = await getHouseMonthsAction(selectedHouseId);
    months = monthsRes?.data || [];
  }
  
  const selectedMonthId = searchParams?.month || months.find((m: any) => !m.isClosed)?.id || months[0]?.id;

  let expenses = [];
  if (selectedMonthId) {
    const expensesRes = await getExpensesByMonthAction(selectedMonthId);
    expenses = expensesRes?.data || [];
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <ExpensesView 
         expenses={expenses} 
         houses={houses} 
         months={months} 
         selectedHouseId={selectedHouseId} 
         selectedMonthId={selectedMonthId} 
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Expenses",
  description: "Track and manage house overheads and utilities",
};

export default ExpensesPage;
