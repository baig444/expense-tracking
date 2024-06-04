"use client"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  const {user,isSignedIn} =useUser();
  return (
    <div className="p-4 flex justify-between items-center border shadow-md">
      <Image src="./logo.svg" alt="logo" width={160} height={100} />
      {
        isSignedIn ? <UserButton/> :<Link href="/sign-in"><Button>Get Started</Button></Link>
      }
    </div>
  )
}
export default Header
