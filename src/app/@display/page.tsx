'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserGetQuery } from "@/hooks/fhub/useUserGetQuery";
import { useUserUpdateMutation } from "@/hooks/fhub/useUserUpdateMutation";
import { useFhubPrivyAccount } from "@/hooks/useFhubPrivyAccount";
import { useState } from "react";

export default function ChangeDisplay() {
  const account = useFhubPrivyAccount()

  const userGetQuery = useUserGetQuery({ args: account ? { fid: account?.fid } : undefined })
  const userUpdateMutation = useUserUpdateMutation()
  const [display, setDisplay] = useState('')

  if (!account) return <>Not logged in</>
  if (!userGetQuery.isSuccess) return <>Loading user display</>

  return <div className="flex flex-col gap-2 border">
    <label htmlFor="display-input">Display</label>
    <Input id="display-input" placeholder="your display" defaultValue={userGetQuery.data.displayName ?? ''} onChange={(e) => setDisplay(e.target.value)} />
    <Button disabled={userUpdateMutation.isPending} onClick={() => userUpdateMutation.mutate({
      data: {
        type: 'display',
        value: display,
      },
      account
    })}>Update</Button>
  </div>
}
