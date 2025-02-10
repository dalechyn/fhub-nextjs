import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'Cast.fromString',
  Actions.Cast.fromString.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.Cast.fromString.ParametersType | undefined,
): QueryKey {
  return ['Cast.fromString', parameters] as const
}

export function useCastFromStringQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.Cast.fromString.ReturnType,
          Actions.Cast.fromString.ErrorType,
          Actions.Cast.fromString.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.Cast.fromString.ParametersType | undefined
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
