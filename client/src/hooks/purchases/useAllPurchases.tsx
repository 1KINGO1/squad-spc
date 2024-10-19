import { useQuery } from "@tanstack/react-query";
import { getAllPurchases, GetAllPurchasesParams } from "../../services/purchases.service";
import queryKeys from "../../query-keys";
import useCurrentUser from "../../store/useCurrentUser";

const useActivePurchases = (params: GetAllPurchasesParams) => {
  const { user } = useCurrentUser();
  return useQuery(
    {
      queryKey: queryKeys.allPurchases(params),
      queryFn: () => getAllPurchases(params),
      enabled: user !== null,
      placeholderData: (prev) => prev
    }
  );
};

export default useActivePurchases;
