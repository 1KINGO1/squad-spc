import useCurrentUser from "../../store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../query-keys";
import sortByCreateDate from "../../utils/sortByCreateDate";
import { getActivePurchases } from "../../services/purchases.service";
import { Purchase } from "../../types/models/Purchase";

const useActivePurchases = () => {
  const { user } = useCurrentUser();
  return useQuery(
    {
      queryKey: queryKeys.activePurchases(),
      queryFn: getActivePurchases,
      enabled: user !== null,
      select: sortByCreateDate<Purchase>
    }
  );
};

export default useActivePurchases;