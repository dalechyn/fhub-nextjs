import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'ConversationTree.getByFid',
  Actions.ConversationTree.getByFid.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.ConversationTree.getByFid.ParametersType | undefined,
): QueryKey {
  return ['ConversationTree.getByFid', parameters] as const
}

export function useConversationTreeGetByFidQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.ConversationTree.getByFid.ReturnType,
          Actions.ConversationTree.getByFid.ErrorType,
          Actions.ConversationTree.getByFid.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.ConversationTree.getByFid.ParametersType | undefined
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
