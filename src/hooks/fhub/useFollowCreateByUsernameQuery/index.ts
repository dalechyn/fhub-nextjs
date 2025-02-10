import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'Follow.createByUsername',
  Actions.Follow.createByUsername.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.Follow.createByUsername.ParametersType | undefined,
): QueryKey {
  return ['Follow.createByUsername', parameters] as const
}

export function useFollowCreateByUsernameQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.Follow.createByUsername.ReturnType,
          Actions.Follow.createByUsername.ErrorType,
          Actions.Follow.createByUsername.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.Follow.createByUsername.ParametersType | undefined
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
