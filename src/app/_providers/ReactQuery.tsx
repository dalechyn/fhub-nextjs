'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import superjson from 'superjson'

function makeQueryClient() {
  return new QueryClient()
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // supsends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export function ReactQueryProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration transformer={superjson}>
      {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
