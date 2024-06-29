import { useQuery } from "@tanstack/react-query";

import queryKeys from "../query-keys";
import { getGroups } from "../services/groups.service";
import Group from "../types/models/Group";
import useCurrentUser from "../store/useCurrentUser";
import { Roles } from "../types/Roles";


const useGroups = () => {
  const {user} = useCurrentUser();

  const query =  useQuery({
    queryKey: queryKeys.groups(),
    queryFn: getGroups,
    enabled: !!user && [Roles.Root, Roles.Admin].includes(user.permission),
  });
  
  return {
    groups: (query.data || []) as Group[],
  }
}

export default useGroups;