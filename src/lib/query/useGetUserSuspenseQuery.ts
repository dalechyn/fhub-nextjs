import { useSuspenseQuery } from "@tanstack/react-query";
import { Actions } from "fhub";
import SuperJSON from "superjson";
import { BASE_URL } from "../baseUrl";

export function useGetUserSuspenseQuery(parameters: Actions.User.get.ParametersType) {
  return useSuspenseQuery({
    queryKey: ['getUser', parameters] as const,
    queryFn: async ({ queryKey: [_, parameters] }) => {
      const response = await fetch(`${BASE_URL}/api/getUser?fid=${parameters.fid}`)
      return SuperJSON.parse<Actions.User.get.ReturnType>(await response.text())
    }
  })
}
