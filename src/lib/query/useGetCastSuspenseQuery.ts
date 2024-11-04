import { useSuspenseQuery } from "@tanstack/react-query";
import { Actions } from "fhub";
import SuperJSON from "superjson";
import { BASE_URL } from "../baseUrl";

export function useGetCastSuspenseQuery(parameters: Actions.Cast.get.ParametersType) {
  return useSuspenseQuery({
    queryKey: ['getCast', parameters] as const,
    queryFn: async ({ queryKey: [_, parameters] }) => {
      const response = await fetch(`${BASE_URL}/api/getCast?fid=${parameters.fid}&hash=${parameters.hash}`)
      return SuperJSON.parse<Actions.Cast.get.ReturnType>(await response.text())
    }
  })
}
