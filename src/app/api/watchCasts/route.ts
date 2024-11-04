import { fhubClient } from "@/lib/fhub/client"
import { Actions } from "fhub"
import SuperJSON from "superjson"

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(SuperJSON.stringify(value))
      }
    },
  })
}

export async function GET() {
  const stream = iteratorToStream(Actions.Watch.watchCasts(fhubClient))

  return new Response(stream)
}
