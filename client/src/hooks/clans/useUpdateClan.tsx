import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { updateClan } from "../../services/clans.service";
import Clan from "../../types/models/Clan";

interface UpdateClanParams {
  onSuccess?: (changedClan: Clan) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateClan = ({onSuccess, onError}: UpdateClanParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClan,
    onSuccess: (changedClan) => {
      queryClient.removeQueries({queryKey: queryKeys.listClans() });
      queryClient.setQueryData(queryKeys.clans(), (previous : Clan[]) => {
        if (!previous) return [];

        return previous.map((clan) => {
          if (clan.id === changedClan.id) return {
            ...clan,
            ...changedClan
          };
          return clan;
        });
      });

      if (onSuccess) onSuccess(changedClan);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateClan;