import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import queryKeys from "../query-keys";
import { deleteGroup } from "../services/groups.service";
import Group from "../types/models/Group";

interface DeleteGroupParams {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteGroup = ({ onError, onSuccess }: DeleteGroupParams) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: (deletedGroup) => {
      queryClient.setQueryData(queryKeys.groups(), (previous : Group[]) => {
        return [...previous].filter((list) => list.id !== deletedGroup.id);
      });

      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{message: string}>) => {
      const errMessage = error?.response?.data.message ?? error.message;
      if (onError) onError(errMessage);
    }
  })
}

export default useDeleteGroup;