import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'SuperCast.get',
  Actions.SuperCast.get.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.SuperCast.get.ParametersType | undefined,
): QueryKey {
  return ['SuperCast.get', parameters] as const
}

export function useSuperCastGetQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.SuperCast.get.ReturnType,
          Actions.SuperCast.get.ErrorType,
          Actions.SuperCast.get.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.SuperCast.get.ParametersType | undefined
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
