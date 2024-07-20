import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { createGroup } from "../../services/groups.service";
import Group from "../../types/models/Group";

interface CreateGroupParams {
  onSuccess?: (createdGroup: Group) => void;
  onError?: (errorMessage: string) => void;
}

const useCreateGroup = ({onSuccess, onError}: CreateGroupParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (createdGroup) => {

      // Invalidate the list of clans query
      queryClient.removeQueries({queryKey: queryKeys.listClans() });
      queryClient.setQueryData(queryKeys.groups(), (previous : Group[]) => {
        if (!previous) return [createdGroup];

        return [...previous, createdGroup];
      });

      if (onSuccess) onSuccess(createdGroup);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useCreateGroup;