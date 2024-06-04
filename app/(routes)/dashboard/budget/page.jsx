"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'

const page = () => {
  return (
    <div className='p-8'>
      <h2 className='font-medium text-3xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default page
