import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { getGroups } from "../services/groups.service";
import Group from "../types/models/Group";


const useGroups = () => {
  const query =  useQuery({
    queryKey: queryKeys.groups(),
    queryFn: getGroups,
  });
  
  return {
    groups: (query.data || []) as Group[],
  }
}

export default useGroups;