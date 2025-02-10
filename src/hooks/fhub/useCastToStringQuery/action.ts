'use server'
import { fhubClient, options } from '../client'
import { Actions } from 'fhub'

export async function action(
  parameters: Actions.Cast.toString.ParametersType,
): Promise<Actions.Cast.toString.ReturnType> {
  return Actions.Cast.toString(fhubClient, parameters, options)
}
