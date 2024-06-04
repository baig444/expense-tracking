"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import db from "@/utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";

const CreateBudget = ({refreshData}) => {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();

  // Use to Create New Budget

  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        icon: emojiIcon,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      refreshData();
      toast.success("New Budget Created!");
      setName("");
      setAmount("");
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                    onClick={()=>onCreateBudget()}
                    type="button"
                     className="w-full mt-5"
                     >
                      Create Budget
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
