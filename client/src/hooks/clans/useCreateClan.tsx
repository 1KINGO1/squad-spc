import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { createClan } from "../../services/clans.service";
import Clan from "../../types/models/Clan";

interface UpdateClanParams {
  onSuccess?: (changedClan: Clan) => void;
  onError?: (errorMessage: string) => void;
}

const useCreateClan = ({onSuccess, onError}: UpdateClanParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClan,
    onSuccess: (createdClan) => {

      // Invalidate the list of clans query
      queryClient.removeQueries({queryKey: queryKeys.listClans() });
      queryClient.setQueryData(queryKeys.clans(), (previous : Clan[]) => {
        if (!previous) return [createdClan];

        return [...previous, createdClan];
      });

      if (onSuccess) onSuccess(createdClan);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useCreateClan;