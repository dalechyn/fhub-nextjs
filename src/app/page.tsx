import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fhubClient } from "@/lib/fhub/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Actions } from "fhub";

export default async function Home() {
  const cast = await Actions.Cast.get(fhubClient,{fid: 11517n, hash: '0x404d509c220ea59dcada18ad8496f8ef115db1d2'})
  const user = await Actions.User.get(fhubClient,{fid: 11517n})

  return <Card>
    <CardContent className="space-y-2">
      <div className="flex gap-1">
        <Avatar>
          <AvatarImage src={user.pfp ?? undefined}></AvatarImage>
          <AvatarFallback>{user.username?.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{user.displayName}</p>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>
      {cast.text.unwrapped}
    </CardContent>
  </Card>
}
