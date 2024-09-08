import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPurchase } from "../../services/purchases.service";
import { Purchase } from "../../types/models/Purchase";
import queryKeys from "../../query-keys";

interface CreatePurchaseParams {
  onSuccess?: (purchase: Purchase) => void;
  onError?: (errorMessage: string) => void;
}

const usePurchase = (params: CreatePurchaseParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchase,
    onSuccess: (purchase: Purchase) => {
      queryClient.setQueryData(queryKeys.balance(), (previous : { balance: number }) => {
        return { ...previous, balance: previous.balance - purchase.purchase_price };
      });

      queryClient.setQueryData(queryKeys.activePurchases(), (previous: Purchase[]) => {
        return [ ...previous, purchase ];
      });


      if (params.onSuccess) {
        params.onSuccess(purchase);
      }
    },
    onError: (error: Error & {response: any}) => {
      if (params.onError) {
        params.onError(error?.response?.data?.message ?? error.message);
      }
    }
  });
};

export default usePurchase;
