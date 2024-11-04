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
  const hash = (() => {
    const value = url.searchParams.get('hash')
    if (!value) throw new Error('No fid')
    return value as `0x${string}`
  })()

  const cast = await Actions.Cast.get(fhubClient, { fid, hash })

  return new Response(SuperJSON.stringify(cast))
}
