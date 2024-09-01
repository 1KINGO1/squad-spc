import { Button, Form, Modal } from "antd";
import { FC, useState } from "react";
import ProductForm from "./shared/ProductForm";
import { IFormValues } from "./shared/IFormValues";
import useCreateProduct from "../../../hooks/products/useCreateProduct";
import usePermissions from "../../../hooks/permissions/usePermissions";
import Permission from "../../../types/models/Permission";

interface CreateProductModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  listId: number;
}

const CreateProductModal: FC<CreateProductModalProps> = ({isOpen, setIsOpen, listId}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitable, setisSubmitable] = useState(false);

  const [form] = Form.useForm<IFormValues>();
  const values = Form.useWatch([], form);
  const { permissions } = usePermissions();
  const createMutation = useCreateProduct({
    onSuccess(){
      setIsLoading(false);
      setIsOpen(false);
    },
    onError(){
      setIsLoading(false);
    }
  })

  const handleCancel = () => {
    setIsOpen(false);
    setIsLoading(false);
  }

  const handleOk = () => {
    if (isLoading) return;

    createMutation.mutate({
      name: values.name,
      description: values.description,
      price: values.price,
      tag: values.tag ?? undefined,
      tagColor: values?.tagColor?.toHexString() ?? undefined,
      productColor: values?.productColor?.toHexString() ?? undefined,
      duration: values?.duration?.value ? values.duration.value * values.duration.unit : undefined,
      permissions: values.permissions.map(permission => (permissions.find(p => p.value === permission) as Permission).id),
      listId
    });
  }

  return (
    <Modal
      open={isOpen}
      title={"Create new product"}
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
          Create
        </Button>
      ]}
    >

      <ProductForm form={form} setSubmittable={setisSubmitable} />

    </Modal>
  )
}

export default CreateProductModal