import { useQuery } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { getUsers } from "../../services/users.service";
import useCurrentUser from "../../store/useCurrentUser";
import User from "../../types/models/User";

interface UseUsersParams {
  limit?: number,
  orderBy?: "ASC" | "DESC"
  orderByField?: string,
}

const useUsers = (params: UseUsersParams) => {
  const {user} = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.users(),
      queryFn: () => getUsers({
        limit: params.limit ?? 9999,
        order: {
          by: params.orderBy ?? "DESC",
          field: params.orderByField ?? "permission"
        }
      }),
      enabled: user !== null,
    });

  return {
    users: (query.data || []) as User[],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  }
}

export default useUsers;