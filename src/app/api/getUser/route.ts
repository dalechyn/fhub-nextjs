import { fhubClient } from "@/lib/fhub/client"
import { Actions } from "fhub"
import SuperJSON from "superjson"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const fid = (() => {
    const value = url.searchParams.get('fid')
    if (!value) throw new Error('No fid')
    return BigInt(value)
  })()

  const cast = await Actions.User.get(fhubClient, { fid })

  return new Response(SuperJSON.stringify(cast))
}
