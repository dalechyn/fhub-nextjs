'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.SuperCast.get.ParametersType,
): Promise<Actions.SuperCast.get.ReturnType> {
  return Actions.SuperCast.get(fhubClient, parameters, options)
}
