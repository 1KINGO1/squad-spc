import {
  useQuery
} from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { getClans } from "../../services/clans.service";
import useCurrentUser from "../../store/useCurrentUser";
import Clan from "../../types/models/Clan";
import sortByCreateDate from "../../utils/sortByCreateDate";

const useClans = () => {
  const { user } = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.clans(),
      queryFn: getClans,
      enabled: user !== null,
      select: sortByCreateDate<Clan>
    });

  return {
    clans: (query.data || []) as Clan[],
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess
  };
};

export default useClans;