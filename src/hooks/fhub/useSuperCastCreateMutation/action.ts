'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.SuperCast.create.ParametersType,
): Promise<Actions.SuperCast.create.ReturnType> {
  return Actions.SuperCast.create(fhubClient, parameters, options)
}
