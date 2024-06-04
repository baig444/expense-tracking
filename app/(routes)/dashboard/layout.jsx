"use client"
import { Budgets } from "@/utils/schema"
import DashboardHeader from "./_components/DashboardHeader"
import SideNav from "./_components/SideNav"
import { eq } from "drizzle-orm"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import db from "@/utils/dbConfig"
import { useRouter } from "next/navigation"


const DashboardLayout = ({children}) => {

    const {user} = useUser();
    const router = useRouter();

    useEffect(()=>{
    user&&checkUserBudget();
    },[user])
    
    const checkUserBudget = async () =>{
        const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))

        console.log(result)
        if(result?.length===0){
           router.replace("/dashboard/budget")
        }
    }
  return (
    <div>
        <div className="fixed md:w-64 hidden md:block"> 
            <SideNav/>
        </div>
        <div className="md:ml-64">
            <DashboardHeader/>
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout
