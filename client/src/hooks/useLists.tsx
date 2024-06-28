import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { getLists } from "../services/lists.service";
import useCurrentUser from "../store/useCurrentUser";
import List from "../types/models/List";

const useLists = () => {
  const {user} = useCurrentUser();
  const query = useQuery({ queryKey: [queryKeys.lists()], queryFn: getLists, enabled: user !== null });

  return {
    lists: query.data || [] as List[],
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
  }
}

export default useLists;