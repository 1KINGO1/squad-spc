import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { Product } from "../../types/models/Product";
import { updateProduct } from "../../services/products.service";
import { GetAllPurchasesParams, GetAllPurchasesResponse, updatePurchase } from "../../services/purchases.service";
import { Purchase } from "../../types/models/Purchase";

interface UpdatePurchaseParams {
  onSuccess?: (changedPurchase: Purchase) => void;
  onError?: (errorMessage: string) => void;
  params: GetAllPurchasesParams;
}

const useUpdatePurchase = ({onSuccess, onError, params}: UpdatePurchaseParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePurchase,
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
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useUpdatePurchase;
