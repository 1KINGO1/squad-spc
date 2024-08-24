import useCurrentUser from "../../store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../query-keys";
import { getProducts } from "../../services/products.service";
import sortByCreateDate from "../../utils/sortByCreateDate";
import { Product } from "../../types/models/Product";

const useProducts = () => {
  const { user } = useCurrentUser();
  const query = useQuery(
    {
      queryKey: queryKeys.products(),
      queryFn: getProducts,
      enabled: user !== null,
      select: sortByCreateDate<Product>
    }
  );

  return query;
};

export default useProducts;