import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { updateGroup } from "../../services/groups.service";
import Group from "../../types/models/Group";

interface UpdateGroupParams {
  onSuccess?: (changedGroup: Group) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateGroup = ({onSuccess, onError}: UpdateGroupParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroup,
    onSuccess: (changedGroup) => {
      queryClient.setQueryData(queryKeys.groups(), (previous : Group[]) => {
        if (!previous) return [];

        return previous.map((group) => {
          if (group.id === changedGroup.id) return {
            ...group,
            ...changedGroup
          };
          return group;
        });
      });

      if (onSuccess) onSuccess(changedGroup);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateGroup;