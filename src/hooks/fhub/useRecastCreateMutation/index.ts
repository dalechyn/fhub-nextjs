import { action } from './action'
import { Actions } from 'fhub'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

export function useRecastCreateMutation({
  mutation = {},
}: {
  mutation?:
    | UseMutationOptions<
        Actions.Recast.create.ReturnType,
        Actions.Recast.create.ErrorType,
        Exclude<Actions.Recast.create.ParametersType, { message: unknown }>
      >
    | undefined
} = {}) {
  return useMutation({
    ...mutation,
    mutationKey: ['Recast.create'],
    mutationFn: async (args) => {
      const message = await Actions.Recast.createPreconstruct(args)
      return action({ message })
    },
  })
}
