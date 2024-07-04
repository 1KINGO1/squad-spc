import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { deleteList } from "../services/lists.service";
import List from "../types/models/List";
import { AxiosError } from "axios";

interface UpdateClanParams {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteList = ({ onError, onSuccess }: UpdateClanParams) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: (deletedList) => {
      queryClient.setQueryData(queryKeys.lists(), (previous : List[]) => {
        return [...previous].filter((list) => list.id !== deletedList.id);
      });

      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useDeleteList;