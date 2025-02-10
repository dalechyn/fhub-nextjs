import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'Warpcast.getCastIdFromUrl',
  Actions.Warpcast.getCastIdFromUrl.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.Warpcast.getCastIdFromUrl.ParametersType | undefined,
): QueryKey {
  return ['Warpcast.getCastIdFromUrl', parameters] as const
}

export function useWarpcastGetCastIdFromUrlQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.Warpcast.getCastIdFromUrl.ReturnType,
          Actions.Warpcast.getCastIdFromUrl.ErrorType,
          Actions.Warpcast.getCastIdFromUrl.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.Warpcast.getCastIdFromUrl.ParametersType | undefined
}) {
  const enabled = Boolean(args && (query.enabled ?? true))
  return useQuery({
    ...query,
    queryKey: queryKey(args),
    queryFn: ({ queryKey: [_, args] }) => {
      if (args === undefined) throw new Error('Missing args')
      return action(args)
    },
    enabled,
  })
}
