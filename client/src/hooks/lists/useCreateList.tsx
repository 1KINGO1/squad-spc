import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../../query-keys";
import { createList } from "../../services/lists.service";
import Clan from "../../types/models/Clan";
import List from "../../types/models/List";

interface UpdateClanParams {
  onSuccess?: (changedClan: Clan) => void;
  onError?: (errorMessage: string) => void;
}

const useCreateList = ({onSuccess, onError}: UpdateClanParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: (createdList) => {
      queryClient.setQueryData(queryKeys.lists(), (previous : List[]) => {
        if (!previous) return [createdList];

        return [...previous, createdList];
      });

      if (onSuccess) onSuccess(createdList);
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useCreateList;