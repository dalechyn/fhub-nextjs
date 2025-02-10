import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'ConversationTree.get',
  Actions.ConversationTree.get.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.ConversationTree.get.ParametersType | undefined,
): QueryKey {
  return ['ConversationTree.get', parameters] as const
}

export function useConversationTreeGetQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.ConversationTree.get.ReturnType,
          Actions.ConversationTree.get.ErrorType,
          Actions.ConversationTree.get.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.ConversationTree.get.ParametersType | undefined
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
