'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Cast.fromString.ParametersType,
): Promise<Actions.Cast.fromString.ReturnType> {
  return Actions.Cast.fromString(fhubClient, parameters, options)
}
