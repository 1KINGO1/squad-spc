import styles from "./Products.module.scss";
import Product from "./Product";
import ListSelect from "./ListSelect";
import useProducts from "../../../../hooks/products/useProducts";
import { useEffect, useState } from "react";
import useBalance from "../../../../hooks/payments/useBalance";

const ProductList = () => {
  const { data, isSuccess } = useProducts();
  const [listId, setListId] = useState<number | null>(null);
  const {data: balance} = useBalance();

  useEffect(() => {
    if (isSuccess && data?.length) {
      setListId(data[0].list.id);
    }
  }, [isSuccess, data]);

  return (
    <div>
      <ListSelect setListId={setListId} />
      <div className={styles.productListWrapper}>
        {data ?
          data
            .filter(product => product.shouldSale)
            .filter((product) => product.list.id === listId)
            .map((product) => {
              return (
                <Product key={product.id} product={product} isDisabled={product.price > (balance?.balance ?? 0)}/>
              );
            }) : "Loading..."}
      </div>
    </div>
  );
};

export default ProductList;