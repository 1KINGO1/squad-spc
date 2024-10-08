import SelectList from "./components/SelectList";
import { useState } from "react";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import useProducts from "../../hooks/products/useProducts";
import Product from "./components/Product";
import useConfig from "../../hooks/config/useConfig";
import { useNavigate } from "react-router";

const Products = () => {
  const [listId, setListId] = useState<number>(0);
  const { data } = useProducts();
  const { data: config } = useConfig();
  const navigate = useNavigate();

  if (!config?.payment?.general?.enabled) {
    navigate("/");
    return null;
  }

    return (
    <>
      <div>
        <div>
          <SelectList listId={listId} setListId={setListId} />
        </div>
        <ProductList>
          {
            data
              ?.filter(product => product.list.id === listId)
              ?.map(product => <Product key={product.id} product={product} />)
          }
        </ProductList>
      </div>
      <CreateProduct listId={listId} />
    </>
  );
};

export default Products;
