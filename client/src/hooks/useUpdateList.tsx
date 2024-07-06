import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { updateList } from "../services/lists.service";
import List from "../types/models/List";

interface UpdateListParams {
  onSuccess?: (changedList: List) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateList = ({onSuccess, onError}: UpdateListParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateList,
    onSuccess: (changedList) => {
      queryClient.setQueryData(queryKeys.lists(), (previous : List[]) => {
        if (!previous) return [];

        return previous.map((list) => {
          console.log(list, changedList)
          if (list.id === changedList.id) return {
            ...list,
            ...changedList
          };
          return list;
        });
      });

      if (onSuccess) onSuccess(changedList);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateList;