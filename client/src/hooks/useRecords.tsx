import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import useCurrentUser from "../store/useCurrentUser";
import Record from "../types/models/Record";
import { useState } from "react";
import { getRecords } from "../services/records.service";

const useRecords = (listId: number, clanId: number) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const {user} = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.records(listId, clanId),
      queryFn: () => getRecords({listId, clanId}),
      enabled: user !== null && !isDisabled,
    });

  return {
    records: (query.data || []) as Record[],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    enable: () => setIsDisabled(false),
  }
}

export default useRecords;