'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserGetQuery } from "@/hooks/fhub/useUserGetQuery";
import { useUserUpdateMutation } from "@/hooks/fhub/useUserUpdateMutation";
import { useFhubPrivyAccount } from "@/hooks/useFhubPrivyAccount";
import { useState } from "react";

export default function ChangeBio() {
  const account = useFhubPrivyAccount()

  const userGetQuery = useUserGetQuery({ args: account ? { fid: account?.fid } : undefined })
  const userUpdateMutation = useUserUpdateMutation()
  const [bio, setBio] = useState('')

  if (!account) return <>Not logged in</>
  if (!userGetQuery.isSuccess) return <>Loading user bio</>

  return <div className="flex flex-col gap-2 border">
    <label htmlFor="bio-input">Bio</label>
    <Input id="bio-input" placeholder="your bio" defaultValue={userGetQuery.data.bio ?? ''} onChange={(e) => setBio(e.target.value)} />
    <Button disabled={userUpdateMutation.isPending} onClick={() => userUpdateMutation.mutate({
      data: {
        type: 'bio',
        value: bio,
      },
      account
    })}>Update</Button>
  </div>
}
