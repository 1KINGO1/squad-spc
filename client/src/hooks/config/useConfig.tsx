import { useQuery } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import useCurrentUser from "../../store/useCurrentUser";
import { getConfig } from "../../services/config.service";


const useConfig = () => {
  const {user} = useCurrentUser();

  return useQuery({
    queryKey: queryKeys.config(),
    queryFn: getConfig,
    enabled: !!user,
  });

}

export default useConfig;