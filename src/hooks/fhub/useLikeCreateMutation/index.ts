import { action } from './action'
import { Actions } from 'fhub'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

export function useLikeCreateMutation({
  mutation = {},
}: {
  mutation?:
    | UseMutationOptions<
        Actions.Like.create.ReturnType,
        Actions.Like.create.ErrorType,
        Exclude<Actions.Like.create.ParametersType, { message: unknown }>
      >
    | undefined
} = {}) {
  return useMutation({
    ...mutation,
    mutationKey: ['Like.create'],
    mutationFn: async (args) => {
      const message = await Actions.Like.createPreconstruct(args)
      return action({ message })
    },
  })
}
