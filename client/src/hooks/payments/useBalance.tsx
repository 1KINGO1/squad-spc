import useCurrentUser from "../../store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../query-keys";
import { getBalance } from "../../services/payments.service";

const useBalance = () => {
  const {user} = useCurrentUser();
  const query = useQuery({ queryKey: queryKeys.balance(), queryFn: getBalance, enabled: user !== null });

  return query;
}

export default useBalance;