import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'Cast.getRoot',
  Actions.Cast.getRoot.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.Cast.getRoot.ParametersType | undefined,
): QueryKey {
  return ['Cast.getRoot', parameters] as const
}

export function useCastGetRootQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.Cast.getRoot.ReturnType,
          Actions.Cast.getRoot.ErrorType,
          Actions.Cast.getRoot.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.Cast.getRoot.ParametersType | undefined
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
