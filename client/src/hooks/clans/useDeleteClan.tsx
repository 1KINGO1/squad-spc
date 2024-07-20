import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../../query-keys";
import { deleteClan } from "../../services/clans.service";
import Clan from "../../types/models/Clan";

interface UpdateClanParams {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteClan = ({ onError, onSuccess }: UpdateClanParams) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClan,
    onSuccess: (deletedClan: Clan) => {

      function clanRemove(previous: Clan[]) {
        return [...previous].filter((clan) => clan.id !== deletedClan.id);
      }

      queryClient.setQueryData(queryKeys.clans(), clanRemove);
      queryClient.removeQueries({queryKey: queryKeys.listClans()});
      queryClient.removeQueries({queryKey: queryKeys.clans()});

      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useDeleteClan;