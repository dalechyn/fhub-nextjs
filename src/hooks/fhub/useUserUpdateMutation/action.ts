'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.User.update.ParametersType,
): Promise<Actions.User.update.ReturnType> {
  return Actions.User.update(fhubClient, parameters, options)
}
