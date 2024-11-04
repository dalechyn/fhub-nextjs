'use client'
import { Card, CardContent } from "@/components/ui/card";
import { useGetCastSuspenseQuery } from "@/lib/query/useGetCastSuspenseQuery";
import { Actions } from "fhub";
import { Types } from "fhub/Node";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";

function Cast(parameters: {cast: Types.Cast}) {
return <Card>
    <CardContent className="space-y-2">
      <b>
      fid: {parameters.cast.fid}: </b>
      {parameters.cast.text.value}
    </CardContent>
  </Card>

}

export async function* streamingFetch( input: RequestInfo | URL, init?: RequestInit ): Actions.Watch.watchCasts.ReturnType {

    const response = await fetch( input, init)  
  if (!response.body) throw new Error('bad api route')
    const reader  = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    for( ;; ) {
        const { done, value } = await reader.read()
        if( done ) break;

        try {
            yield SuperJSON.parse<Types.Cast>(decoder.decode(value))
        }
        catch( e:any ) {
            console.warn( e.message )
        }

    }
}

export default function Home() {
  const getCastSuspenseQuery = useGetCastSuspenseQuery({fid: 11517n, hash: '0x404d509c220ea59dcada18ad8496f8ef115db1d2'})
const [casts, setCasts] = useState<Types.Cast[]>([]);

  useEffect( () => {
    const asyncFetch = async () => {
      const it = streamingFetch( '/api/watchCasts') 

      for await ( const value of it ) {
        setCasts(prev => [value,...prev])
      }
    }

    asyncFetch()
  }, []);

  return <>
    <h1 className="text-3xl text-center">provided by Build your own client ™</h1>
    {casts.map((cast, i) => <Cast cast={cast} key={i}/>)}
    <Cast cast={getCastSuspenseQuery.data}/>
  </>
}
