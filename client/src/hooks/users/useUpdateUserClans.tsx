import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { updateUserClans } from "../../services/users.service";
import User from "../../types/models/User";
import Clan from "../../types/models/Clan";

interface UpdateUserPermissionParams {
  onSuccess?: (changedUser: User) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateUserClans = ({ onSuccess, onError }: UpdateUserPermissionParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserClans,
    onSuccess: (changedUser) => {
      queryClient.setQueryData(queryKeys.clans(), (previous: Clan[]) => {
        if (!previous) return [];

        return previous.map((clan) => {
          if (
            changedUser.clans.some((userClan) => userClan.id === clan.id) &&
            clan.clan_leaders.every((leader) => leader.id !== changedUser.id)
          ) {
            return {
              ...clan,
              clan_leaders: [...clan.clan_leaders, changedUser]
            };
          }
          else if (
            !changedUser.clans.some((userClan) => userClan.id === clan.id) &&
            clan.clan_leaders.some((leader) => leader.id === changedUser.id)
          ) {
            return {
              ...clan,
              clan_leaders: clan.clan_leaders.filter((leader) => leader.id !== changedUser.id)
            };
          }
          return clan;
        });
      });

      if (onSuccess) onSuccess(changedUser);
    },
    onError: (error: any) => {
      console.error(error);
      if (onError) onError(error.message);
    }
  });
};

export default useUpdateUserClans;