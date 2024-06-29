import { useCallback, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { getListClans } from "../services/lists.service";
import useCurrentUser from "../store/useCurrentUser";
import Clan from "../types/models/Clan";


const useListClans = (listId: number) => {
  const {user} = useCurrentUser();
  const [isDisabled, setIsDisabled] = useState(true);

  const queryFn = useCallback(() => getListClans(listId), [listId]);

  const query = useQuery(
    {
      queryKey: queryKeys.listClans(listId),
      queryFn,
      enabled: user !== null && !isDisabled,
      placeholderData: [{ id: 0, name: "Loading..." }]
    }
  );

  return {
    clans: (query.data || []) as Clan[],
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
    enableClanFetch: () => {
      if (isDisabled) setIsDisabled(false);
    },
  }
}

export default useListClans;