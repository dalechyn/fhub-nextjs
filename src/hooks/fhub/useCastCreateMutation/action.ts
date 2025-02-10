'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Cast.create.ParametersType,
): Promise<Actions.Cast.create.ReturnType> {
  return Actions.Cast.create(fhubClient, parameters, options)
}
