import useCurrentUser from "../../store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../query-keys";
import { getProducts } from "../../services/products.service";

const useProducts = () => {
  const {user} = useCurrentUser();
  const query = useQuery({ queryKey: queryKeys.products(), queryFn: getProducts, enabled: user !== null });

  return query;
}

export default useProducts;