"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo';
import db from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import BarCharts from './_components/BarCharts';
import BudgetItem from './budget/_components/BudgetItem';

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);

    console.log(result);
  }
  return (
    <div className='p-5'>
    <h1 className='text-3xl font-bold'>Hi, {user?.fullName}✌️</h1>
    <h2>Here is your Expenses dashboard,Let Your Expnenses Manage Here</h2>
    <CardInfo budgetList={budgetList} />
    <div className='grid grid-cols-1 md:grid-cols-3 mt-6'>
      <div className='md:col-span-2'>
       <BarCharts budgetList={budgetList}/>
      </div>
      <div className='grid gap-2'>
        <h1 className='text-xl font-bold px-5'>Latest Budget</h1>
        {budgetList.map((budget,i) => (
          <BudgetItem budget={budget} key={i}/>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Dashboard
