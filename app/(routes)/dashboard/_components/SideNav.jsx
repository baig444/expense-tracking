import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {
  const MenuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon:LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget',
      icon:PiggyBank,
      path: '/dashboard/budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon:ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon:ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]
  const path = usePathname()
  useEffect(() => {
    console.log(path)
  }, [path])
  return (
    <div className='h-screen p-4 border shadow-sm'>
      <Image src="/logo.svg" alt="logo" width={160} height={100} />
      <div className='mt-5'>
        {MenuList.map((menu,i) => (
          <Link key={i} href={menu.path}>
          <h2  className={`flex items-center gap-2 mb-4  text-gray-500 p-4 cursor-pointer rounded-md hover:bg-blue-100 hover:text-primary ${path==menu.path && 'bg-blue-100 text-primary'}`}>
            <menu.icon/>
            {menu.name}
            </h2>
            </Link>
        ))}
      </div>
      <div className='flex items-center gap-2 fixed bottom-0 p-5'>
        <UserButton/>
        Profile
      </div>
    </div>
  )
}

export default SideNav
