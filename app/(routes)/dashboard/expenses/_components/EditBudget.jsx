"use client"

import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EmojiPicker from 'emoji-picker-react'
import { Pen } from 'lucide-react'
import React, { useState } from 'react'
import { Budgets } from '@/utils/schema'
import db from '@/utils/dbConfig'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'


const EditBudget = ({budget,refreshdata}) => {
  const [emojiIcon, setEmojiIcon] = useState(budget?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  const onUpdateBudget = async () => {
    const result = await db.update(Budgets)
      .set({
        name: name,
        icon: emojiIcon,
        amount: amount
      })
      .where(eq(Budgets.id, budget?.id))
      .returning();
    if (result) {
      refreshdata()
      toast.success("Budget Updated");
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
        <Button className="flex gap-2 items-center"><Pen className="h-5 w-4"/> Edit</Button>  
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div>
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-3">
                  <h2 className="text-black font-medium my-2">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <h2 className="text-black font-medium my-2">Budget Amount</h2>
                  <Input
                    placeholder="e.g. 20000$"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button 
                    disabled={!name || !amount}
                    onClick={()=>onUpdateBudget()}
                    type="button"
                     className="w-full mt-5"
                     >
                      Update Budget
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget
