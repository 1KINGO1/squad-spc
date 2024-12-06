import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivatePurchase, GetAllPurchasesParams, GetAllPurchasesResponse } from "../../services/purchases.service";
import queryKeys from "../../query-keys";
import { Purchase } from "../../types/models/Purchase";

interface DeactivatePurchaseParams {
  onSuccess?: (changedProduct: Purchase) => void;
  onError?: (errorMessage: string) => void;
  params: GetAllPurchasesParams;
}

const useDeactivatePurchase = ({ onSuccess, onError, params }: DeactivatePurchaseParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivatePurchase,
    onSuccess: (updatedPurchase: Purchase) => {
      queryClient.setQueryData(queryKeys.allPurchases(params), (previous: GetAllPurchasesResponse) => {
        return {
          ...previous, purchases: previous.purchases.map(purchase => {
            if (purchase.id === updatedPurchase.id) {
              return {
                ...purchase,
                ...updatedPurchase
              };
            }
            return purchase;
          })
        };
      });

      if (onSuccess) onSuccess(updatedPurchase);
    },
    onError: (error: Error & {response: any}) => {
      if (onError) {
        onError(error?.response?.data?.message ?? error.message);
      }
    }
  });
};

export default useDeactivatePurchase;
