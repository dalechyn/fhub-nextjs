'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Cast.getRoot.ParametersType,
): Promise<Actions.Cast.getRoot.ReturnType> {
  return Actions.Cast.getRoot(fhubClient, parameters, options)
}
