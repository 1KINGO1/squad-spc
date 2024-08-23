import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { Product } from "../../types/models/Product";
import { updateProduct } from "../../services/products.service";

interface UpdateProductParams {
  onSuccess?: (changedProduct: Product) => void;
  onError?: (errorMessage: string) => void;
}

const useUpdateProduct = ({onSuccess, onError}: UpdateProductParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct: Product) => {
      queryClient.setQueryData(queryKeys.products(), (previous : Product[]) => {
        return previous.map(product => {
          if (product.id === updatedProduct.id) {
            return {
              ...product,
              ...updatedProduct
            }
          }
          return product;
        })
      });

      if (onSuccess) onSuccess(updatedProduct);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useUpdateProduct;