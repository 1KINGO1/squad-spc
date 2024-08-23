import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { Product } from "../../types/models/Product";
import { createProduct } from "../../services/products.service";

interface CreateProductParams {
  onSuccess?: (changedProduct: Product) => void;
  onError?: (errorMessage: string) => void;
}

const useCreateProduct = ({onSuccess, onError}: CreateProductParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (createdProduct: Product) => {
      queryClient.setQueryData(queryKeys.products(), (previous : Product[]) => {
        if (!previous) return [createdProduct];

        return [...previous, createdProduct];
      });

      if (onSuccess) onSuccess(createdProduct);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useCreateProduct;