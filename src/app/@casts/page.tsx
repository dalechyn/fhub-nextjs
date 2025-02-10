'use client'
import { useSuperCastGetByFidQuery } from "@/hooks/fhub/useSuperCastGetByFidQuery";

export default function Casts() {

  const superCastGetByFidQuery = useSuperCastGetByFidQuery({ args: { fid: 11517n } })

  console.log(superCastGetByFidQuery.data?.casts)

  if (!superCastGetByFidQuery.isSuccess) return <>Loading casts...</>
  return <div className="flex flex-col gap-2 border">
    {superCastGetByFidQuery.data.casts.map(cast => {
      return <div className="flex flex-col gap-1">
        <p className="font-medium">{cast.text.unwrapped}</p>
        <div className="flex gap-2">
          <div>Likes: {cast.likes.length}</div>
          <div>Recasts: {cast.recasts.length}</div>
        </div>
      </div>
    })}
  </div>
}
