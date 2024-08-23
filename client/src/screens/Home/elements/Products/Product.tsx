import { FC } from "react";
import styles from "./Products.module.scss";
import { Button } from "antd";
import useConfig from "../../../../hooks/config/useConfig";
import { Product as ProductType } from "../../../../types/models/Product";

interface ProductProps {
  product: ProductType;
  isDisabled?: boolean;
}

const Product: FC<ProductProps> = ({ product, isDisabled = false }) => {
  const { data: config } = useConfig();

  return (
    <div
      className={styles.productWrapper}
      style={{
        background: product.productColor ? `linear-gradient(45deg, var(--color-black-2) 0%, ${product.productColor ?? "var(--color-black-2)"}20 100%)` : undefined
      }}
    >
      <p className={styles.productTitle}>{product.name}</p>
      <p className={styles.productDescription}>{product.description}</p>

      <div className={styles.productBuyWrapper}>
        <p className={styles.productPrice}>Price: {product.price} <span>{config?.payment?.general?.currency}</span></p>
        <Button className={styles.productBuyButton} disabled={isDisabled}>
          Buy
        </Button>
      </div>

      {
        product.tag &&
        <div className={styles.productTag} style={{background: product.tagColor ? product.tagColor : undefined }}>
          {product.tag}
        </div>
      }
    </div>
  );
};

export default Product;