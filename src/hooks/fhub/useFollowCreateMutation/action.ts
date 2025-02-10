'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Follow.create.ParametersType,
): Promise<Actions.Follow.create.ReturnType> {
  return Actions.Follow.create(fhubClient, parameters, options)
}
