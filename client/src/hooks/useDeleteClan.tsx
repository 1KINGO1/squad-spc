import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../query-keys";
import { deleteClan } from "../services/clans.service";
import Clan from "../types/models/Clan";

interface UpdateClanParams {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteClan = ({ onError, onSuccess }: UpdateClanParams) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClan,
    onSuccess: (deletedClan) => {
      queryClient.setQueryData(queryKeys.clans(), (previous : Clan[]) => {
        return [...previous].filter((clan) => clan.id !== deletedClan.id);
      });

      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useDeleteClan;