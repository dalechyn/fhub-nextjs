import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'SuperCast.getByFid',
  Actions.SuperCast.getByFid.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.SuperCast.getByFid.ParametersType | undefined,
): QueryKey {
  return ['SuperCast.getByFid', parameters] as const
}

export function useSuperCastGetByFidQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.SuperCast.getByFid.ReturnType,
          Actions.SuperCast.getByFid.ErrorType,
          Actions.SuperCast.getByFid.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.SuperCast.getByFid.ParametersType | undefined
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
