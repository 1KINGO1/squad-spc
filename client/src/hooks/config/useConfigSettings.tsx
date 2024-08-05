import { useQuery } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";
import { getConfigSettings } from "../../services/config.service";


const useConfigSettings = () => {
  const {user} = useCurrentUser();

  return useQuery({
    queryKey: queryKeys.configSettings(),
    queryFn: getConfigSettings,
    enabled: !!user && [Roles.Root].includes(user.permission),
  });

}

export default useConfigSettings;