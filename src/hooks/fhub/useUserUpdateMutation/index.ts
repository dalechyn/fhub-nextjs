import { action } from './action'
import { Actions } from 'fhub'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

export function useUserUpdateMutation({
  mutation = {},
}: {
  mutation?:
    | UseMutationOptions<
        Actions.User.update.ReturnType,
        Actions.User.update.ErrorType,
        Exclude<Actions.User.update.ParametersType, { message: unknown }>
      >
    | undefined
} = {}) {
  return useMutation({
    ...mutation,
    mutationKey: ['User.update'],
    mutationFn: async (args) => {
      const message = await Actions.User.updatePreconstruct(args)
      return action({ message })
    },
  })
}
