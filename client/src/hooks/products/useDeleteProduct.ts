import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryKeys from "../../query-keys";
import { Product } from "../../types/models/Product";
import { createProduct, deleteProduct } from "../../services/products.service";

interface DeleteProductParams {
  onSuccess?: (changedProduct: Product) => void;
  onError?: (errorMessage: string) => void;
}

const useDeleteProduct = ({onSuccess, onError}: DeleteProductParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProduct: Product) => {
      queryClient.setQueryData(queryKeys.products(), (previous : Product[]) => {
        return previous.filter(product => product.id !== deletedProduct.id);
      });

      if (onSuccess) onSuccess(deletedProduct);
    },
    onError: (error: any) => {
      if (onError) onError(error.message);
    }
  })
}

export default useDeleteProduct;