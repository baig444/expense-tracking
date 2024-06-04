import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calculatePercentage = () => {
    const perc = (budget.totalSpend/budget.amount) * 100;
    return perc.toFixed(2);
  }
  return (
    <Link href={`/dashboard/expenses/`+ budget?.id} >
      <div className="p-6 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl p-2 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2>{budget?.name}</h2>
            <h2 className="text-slate-500">{budget?.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary">{budget?.amount}$</h2>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-500 text-xs">
            ${budget.totalSpend?budget.totalSpend : 0} Spend
          </h2>
          <h2 className="text-slate-500 text-xs">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div className=" bg-primary h-2 rounded-full" style={{width:`${calculatePercentage()}%`}}></div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
