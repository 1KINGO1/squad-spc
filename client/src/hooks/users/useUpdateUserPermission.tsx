import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { updateUserPermission } from "../../services/users.service";
import User from "../../types/models/User";

interface UpdateUserPermissionParams {
  onSuccess?: (changedUser: User) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateUserPermission = ({onSuccess, onError}: UpdateUserPermissionParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPermission,
    onSuccess: (changedUser) => {
      queryClient.setQueryData(queryKeys.users(), (previous : User[]) => {
        if (!previous) return [];

        return previous.map((user) => {
          if (user.id === changedUser.id) return {
            ...user,
            ...changedUser
          };
          return user;
        });
      });

      if (onSuccess) onSuccess(changedUser);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateUserPermission;