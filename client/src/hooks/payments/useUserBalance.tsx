import useCurrentUser from "../../store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../query-keys";
import { getBalance, getUserBalance } from "../../services/payments.service";

const useUserBalance = (steamId: string, enabled: boolean) => {
  const { user } = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.userBalance(steamId),
      queryFn: () => getUserBalance(steamId),
      enabled: user !== null && enabled
    }
  );

  return query;
};

export default useUserBalance;
