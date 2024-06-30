import {
  useMutation, useQueryClient
} from "@tanstack/react-query";

import { replaceClanLimits } from "../services/clans.service";
import queryKeys from "../query-keys";

const useUpdateClanLimits = (clanId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: (args: {limits: any}) => replaceClanLimits(clanId, args.limits),
      onSuccess: (data) => {
        queryClient.removeQueries({queryKey: queryKeys.clanLimits(clanId)});
        queryClient.setQueryData(queryKeys.clanLimits(clanId), data);
      },

    }
  );
};

export default useUpdateClanLimits;