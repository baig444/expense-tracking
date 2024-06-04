import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({budgetList}) => {
 
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    budgetList&&CalculateCardInfo();
  },[budgetList]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((budget) => {
      totalBudget_ = totalBudget_ + Number(budget.amount);
      totalSpend_ = totalSpend_ + budget.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);

    console.log(totalBudget_, totalSpend_);
  };
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
      <div className="p-7 rounded-lg border flex justify-between items-center">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">${totalBudget}</h2>
        </div>
        <PiggyBank
          size={32}
          className="bg-primary p-2 h-10 w-10 rounded-full text-white"
        />
      </div>
      <div className="p-7 rounded-lg border flex justify-between items-center">
        <div>
          <h2 className="text-sm">Total Spend</h2>
          <h2 className="font-bold text-2xl">${totalSpend}</h2>
        </div>
        <ReceiptText
          size={32}
          className="bg-primary p-2 h-10 w-10 rounded-full text-white"
        />
      </div>
      <div className="p-7 rounded-lg border flex justify-between items-center">
        <div>
          <h2 className="text-sm">No. of Budget</h2>
          <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
        </div>
        <Wallet
          size={32}
          className="bg-primary p-2 h-10 w-10 rounded-full text-white"
        />
      </div>
    </div>
  );
};

export default CardInfo;
