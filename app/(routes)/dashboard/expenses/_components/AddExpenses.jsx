import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import db from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddExpenses = ({user,budgetId,refreshData}) => {
    const [name,setName] = useState('')
    const [amount,setAmount] = useState('')

    const addnewExpense = async () => {
        const result = await db
          .insert(Expenses)
          .values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdBy: moment().format("DD-MM-YYYY"),
          })
          .returning({ insertedId:Budgets.id })
        if (result) {
          refreshData()
          toast.success("Expense Added")
        } else {
          toast.error("Something went wrong")
        }
      }
  return (
    <div>
      <h2 className='font-bold text-xl'>Add Expense</h2>
      <div className="mt-3">
                  <h2 className="text-black font-medium my-2">Expense Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
      <div className="mt-3">
                  <h2 className="text-black font-medium my-2">Expense Amount</h2>
                  <Input
                    placeholder="e.g. 1000"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button onClick={() => addnewExpense()} disabled={!name || !amount} className="mt-3 w-full">Add New Expense</Button>
    </div>
  )
}

export default AddExpenses
