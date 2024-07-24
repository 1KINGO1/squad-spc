import { FC, useState } from "react";

import AddClanModal from "./modals/AddClanModal";
import CreateButton from "../../components/CreateButton";
import useIsAdmin from "../../hooks/users/useIsAdmin";

const CreateClan: FC = () => {
  const [isClanAddModalVisible, setIsClanAddModalVisible] = useState(false);
  const isAdmin = useIsAdmin();

  return isAdmin ? (
    <>
      <CreateButton
        onClick={() => setIsClanAddModalVisible(true)}
      />
      <AddClanModal isOpen={isClanAddModalVisible} setIsOpen={setIsClanAddModalVisible} />
    </>
  ) : (<></>);
};

export default CreateClan;