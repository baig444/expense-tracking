"use client";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budget/_components/BudgetItem";
import db from "@/utils/dbConfig";
import AddExpenses from "../_components/AddExpenses";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const route = useRouter();

  useEffect(() => {
    user && getBudgetinfo();
    user && getExpenseInfo();
  }, [user]);

  // Get Budget Information

  const getBudgetinfo = async () => {
    const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      
  };

  // Get Expense Information

  const getExpenseInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    console.log(result);

    setBudgetInfo(result[0]);
    getLatestExpense();
  };

  // Get Latest Expense
  const getLatestExpense = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpenseList(result);
    console.log(result);
  };

  // Use to Delete Budget
  const deleteBudget = async () => {
    const deleteExpenseresult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();
    if (deleteExpenseresult) {
      const result = await db.delete(Budgets).where(eq(Budgets.id, params.id));
      console.log(result);
    }
    toast.success("Budget Deleted");
    route.replace("/dashboard/budget");
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex items-center gap-2">
          <ArrowLeft onClick={() => route.back()} cursor={"pointer"} />
          My Expenses
        </span>
        <div className="flex gap-4 items-center">
          <EditBudget budget={budgetInfo} refreshdata={getBudgetinfo} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current Budget along with Expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteBudget()}
                  className="bg-red-500"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem 
          budget={budgetInfo} 
          />
        ) : (
          <div className="w-full h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetinfo()}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshData={() => getExpenseInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;
