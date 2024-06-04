import { UserButton } from "@clerk/nextjs"

const DashboardHeader = () => {
  return (
    <div className="p-4 shadow-sm border-b flex justify-between">
      <div>
        search bar
      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader
