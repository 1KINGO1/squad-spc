import { FC, useState } from "react";

import AddClanModal from "./modals/AddClanModal";
import CreateButton from "../../components/CreateButton";
import useCurrentUser from "../../store/useCurrentUser";
import { Roles } from "../../types/Roles";

const CreateClan: FC = () => {
  const [isClanAddModalVisible, setIsClanAddModalVisible] = useState(false);
  const {user} = useCurrentUser();

  return (
    <>
      <CreateButton
        onClick={() => setIsClanAddModalVisible(true)}
        style={{display: user && [Roles.Root, Roles.Admin].includes(user.permission) ? "block" : "none"}}
      />
      <AddClanModal isOpen={isClanAddModalVisible} setIsOpen={setIsClanAddModalVisible} />
    </>
  );
};

export default CreateClan;