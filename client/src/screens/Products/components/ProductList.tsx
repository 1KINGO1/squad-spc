import { FC, PropsWithChildren } from "react";
import styles from "../Products.module.scss";

const ProductList: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.productList}>
      {children}
    </div>
  )
}

export default ProductList