import { action } from './action'
import { Actions } from 'fhub'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

export function useFollowCreateMutation({
  mutation = {},
}: {
  mutation?:
    | UseMutationOptions<
        Actions.Follow.create.ReturnType,
        Actions.Follow.create.ErrorType,
        Exclude<Actions.Follow.create.ParametersType, { message: unknown }>
      >
    | undefined
} = {}) {
  return useMutation({
    ...mutation,
    mutationKey: ['Follow.create'],
    mutationFn: async (args) => {
      const message = await Actions.Follow.createPreconstruct(args)
      return action({ message })
    },
  })
}
