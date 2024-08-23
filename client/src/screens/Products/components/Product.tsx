import React, { FC, useState } from "react";
import { Product as ProductType } from "../../../types/models/Product";
import styles from "../Products.module.scss";
import useConfig from "../../../hooks/config/useConfig";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UpdateProductModal from "../modals/UpdateProductModal";
import useUpdateProduct from "../../../hooks/products/useUpdateProduct";
import { DeleteProductModal } from "../modals/DeleteClanModal";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  const { data: config } = useConfig();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateMutation = useUpdateProduct({
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false)
  });

  const toggleAvailability = () => {
    if (isLoading) return;
    setIsLoading(true);
    updateMutation.mutate({
      id: product.id,
      shouldSale: !product.shouldSale
    });
  };

  return (
    <>
      <div className={styles.productWrapper}
           style={{
             background: product.productColor ? `linear-gradient(45deg, var(--color-black-2) 0%, ${product.productColor ?? "var(--color-black-2)"}20 100%)` : undefined,
             opacity: product.shouldSale ? 1 : 0.7,
           }}
      >
        <p className={styles.productTitle}>{product.name}</p>
        <p className={styles.productOnHoverAction}>{product.shouldSale ? "" : "Unavailable"}<br/>Hover to action</p>
        <p className={styles.productPrice}>{product.price} <span>{config?.payment?.general?.currency}</span></p>

        <div className={styles.productControlPanel}>
          <Button type="primary" onClick={() => setEditModalOpen(true)} disabled={isLoading}>
            <EditOutlined /> Edit
          </Button>
          <Button danger={product.shouldSale} onClick={toggleAvailability} disabled={isLoading}>
            <CloseCircleOutlined /> Make {product.shouldSale ? "unavailable" : "available"}
          </Button>
          <Button type="primary" danger onClick={() => setDeleteModalOpen(true)} disabled={isLoading}>
            <CloseCircleOutlined /> Delete
          </Button>
        </div>
      </div>

      <UpdateProductModal
        isOpen={isEditModalOpen}
        setIsOpen={setEditModalOpen}
        product={product}
      />

      <DeleteProductModal isOpen={isDeleteModalOpen} setIsOpen={setDeleteModalOpen} productId={product.id}/>
    </>
  );
};

export default Product;