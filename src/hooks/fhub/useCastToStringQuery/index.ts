import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'Cast.toString',
  Actions.Cast.toString.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.Cast.toString.ParametersType | undefined,
): QueryKey {
  return ['Cast.toString', parameters] as const
}

export function useCastToStringQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.Cast.toString.ReturnType,
          Actions.Cast.toString.ErrorType,
          Actions.Cast.toString.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.Cast.toString.ParametersType | undefined
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
