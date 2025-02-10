import { action } from './action'
import type { Actions } from 'fhub'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

type QueryKey = [
  'SuperCast.getByParent',
  Actions.SuperCast.getByParent.ParametersType | undefined,
]

function queryKey(
  parameters: Actions.SuperCast.getByParent.ParametersType | undefined,
): QueryKey {
  return ['SuperCast.getByParent', parameters] as const
}

export function useSuperCastGetByParentQuery({
  query = {},
  args,
}: {
  query?:
    | Omit<
        UseQueryOptions<
          Actions.SuperCast.getByParent.ReturnType,
          Actions.SuperCast.getByParent.ErrorType,
          Actions.SuperCast.getByParent.ReturnType,
          QueryKey
        >,
        'queryKey'
      >
    | undefined
  args?: Actions.SuperCast.getByParent.ParametersType | undefined
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
