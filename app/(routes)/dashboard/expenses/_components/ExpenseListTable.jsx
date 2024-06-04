import db from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseListTable = ({expenseList,refreshData}) => {
  
    const deleteExpense = async (expense) => {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning()
      if (result) {
        toast.success("Expense Deleted")
        refreshData()
      } else {
        toast.error("Something went wrong")
      }
    }
  
    return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 bg-slate-200 p-4'>
     <h2>Name</h2>
     <h2>Amount</h2>
     <h2>Date</h2>
     <h2>Action</h2>
      </div>
      {expenseList?.map((expense,i) => (
        <div className='grid grid-cols-4 p-4 bg-slate-200 mt-2' key={i}>
       <h2>{expense.name}</h2>
       <h2>{expense.amount}</h2>
       <h2>{expense.createdAt}</h2>
       <h2>
        <Trash onClick={()=>deleteExpense(expense)} className='text-red-500 cursor-pointer'/>
       </h2>
        </div>
      ))}
    </div>
  )
}

export default ExpenseListTable
