import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = ['User.get', Actions.User.get.ParametersType | undefined]

function queryKey(
  parameters: Actions.User.get.ParametersType | undefined,
): QueryKey {
  return ['User.get', parameters] as const
}

export function useUserGetQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.User.get.ReturnType,
          Actions.User.get.ErrorType,
          Actions.User.get.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.User.get.ParametersType | undefined
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
