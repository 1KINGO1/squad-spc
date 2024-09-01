import { Button, Form, Modal } from "antd";
import { FC, useMemo, useState } from "react";
import ProductForm from "./shared/ProductForm";
import { IFormValues } from "./shared/IFormValues";
import useCreateProduct from "../../../hooks/products/useCreateProduct";
import usePermissions from "../../../hooks/permissions/usePermissions";
import Permission from "../../../types/models/Permission";
import { Product } from "../../../types/models/Product";
import { ColorFactory } from "antd/es/color-picker/color";
import useUpdateProduct from "../../../hooks/products/useUpdateProduct";

interface UpdateProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product
}

function parseDuration(duration: number): [number, number] {
  const durationInSeconds = duration;
  let unit = 60;

  for (const u of [60, 60*60, 60*60*24]) {
    if ((durationInSeconds / u) % 1 === 0) {
      unit = u;
    }
  }

  return [Math.floor(durationInSeconds / unit), unit];
}

const CreateProductModal: FC<UpdateProductModalProps> = ({isOpen, setIsOpen, product}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitable, setisSubmitable] = useState(false);
  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);
  const { permissions } = usePermissions();
  const updateMutation = useUpdateProduct({
    onSuccess(){
      setIsLoading(false);
      setIsOpen(false);
    },
    onError(){
      setIsLoading(false);
    }
  })

  const initialValues = useMemo(() => {
    const productDuration = product?.duration ? parseDuration(product?.duration) : [];

    return {
      name: product.name,
      description: product.description,
      price: product.price,
      permissions: product.permissions.map(permission => permission.value),
      tag: product.tag ?? null,
      tagColor: product.tagColor ? new ColorFactory(product.tagColor) : null,
      productColor: product.productColor ? new ColorFactory(product.productColor) : null,
      duration: { value: productDuration[0] ?? null, unit: productDuration[1] ?? 60 },
    }
  }, [product])

  const handleCancel = () => {
    setIsOpen(false);
    setIsLoading(false);
    form.resetFields();
  }
  const handleOk = () => {
    if (isLoading) return;

    updateMutation.mutate({
      id: product.id,
      name: values.name,
      description: values.description,
      price: values.price,
      tag: !values.tag ? null : values.tag,
      tagColor: values?.tagColor?.toHexString() ?? null,
      productColor: values?.productColor?.toHexString() ?? null,
      duration: values?.duration?.value ? values.duration.value * values.duration.unit : null,
      permissions: values.permissions.map(permission => (permissions.find(p => p.value === permission) as Permission).id),
    })
  }

  return (
    <Modal
      open={isOpen}
      title={"Update product"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                onClick={handleOk}
                disabled={isLoading || !isSubmitable}

        >
          Update
        </Button>
      ]}
    >

      <ProductForm initialValues={initialValues} form={form} setSubmittable={setisSubmitable} />

    </Modal>
  )
}

export default CreateProductModal