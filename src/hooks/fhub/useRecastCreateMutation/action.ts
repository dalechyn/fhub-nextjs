'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Recast.create.ParametersType,
): Promise<Actions.Recast.create.ReturnType> {
  return Actions.Recast.create(fhubClient, parameters, options)
}
