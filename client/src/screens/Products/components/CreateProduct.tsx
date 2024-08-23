import { FC, useState } from "react";
import CreateButton from "../../../components/CreateButton";
import CreateProductModal from "../modals/CreateProductModal";

interface CreateProductProps {
  listId: number
}

const CreateProduct: FC<CreateProductProps> = ({listId}) => {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);

  return (
    <>
      <CreateButton
        onClick={() => setIsCreateProductOpen(true)}
      />
      <CreateProductModal isOpen={isCreateProductOpen} setIsOpen={setIsCreateProductOpen} listId={listId}/>
    </>
  );
}

export default CreateProduct;