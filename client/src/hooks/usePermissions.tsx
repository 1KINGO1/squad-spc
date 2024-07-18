import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { getPermissions } from "../services/permissions.service";
import useCurrentUser from "../store/useCurrentUser";
import Permission from "../types/models/Permission";
import { Roles } from "../types/Roles";

const usePermissions = () => {
  const {user} = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.permissions(),
      queryFn: getPermissions,
      enabled: user !== null && [Roles.Admin, Roles.Root].includes(user.permission),
      placeholderData: [],
    });

  return {
    permissions: (query.data || []) as Permission[],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  }
}

export default usePermissions;