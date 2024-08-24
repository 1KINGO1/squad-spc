import {
  useQuery
} from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { getClanLimits } from "../../services/clans.service";
import useCurrentUser from "../../store/useCurrentUser";
import Limit from "../../types/models/Limit";
import sortByCreateDate from "../../utils/sortByCreateDate";

const useClanLimits = (clanId: number, isDisabled = false) => {
  const { user } = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.clanLimits(clanId),
      queryFn: () => getClanLimits({ clanId }),
      enabled: user !== null && !!clanId && !isDisabled,
      select: sortByCreateDate<Limit>
    }
  );

  return {
    limits: (query.data || []) as Limit[],
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess
  };
};

export default useClanLimits;