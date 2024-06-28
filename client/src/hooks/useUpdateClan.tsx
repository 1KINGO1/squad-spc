import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClan } from "../services/clans.service";
import { QueryKeys } from "../types/QueryKeys";
import Clan from "../types/Clans";

interface UpdateClanParams {
  onSuccess?: (changedClan: Clan) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateClan = ({onSuccess, onError}: UpdateClanParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClan,
    onSuccess: (changedClan) => {
      queryClient.setQueryData([QueryKeys.Clans], (previous : Clan[]) => {
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