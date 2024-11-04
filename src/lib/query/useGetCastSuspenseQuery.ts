import { useSuspenseQuery } from "@tanstack/react-query";
import { Actions } from "fhub";
import { fhubClient } from "../fhub/client";

export function useGetCastSuspenseQuery(parameters: Actions.Cast.get.ParametersType) {
  return useSuspenseQuery({
    queryKey: ['getCast', parameters] as const,
    queryFn: ({ queryKey: [_, parameters] }) => {
      return Actions.Cast.get(fhubClient, parameters)
    }
  })
}
