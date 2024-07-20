import CreateButton from "../../components/CreateButton";
import { FC, useState } from "react";
import CreateGroupModal from "./modals/CreateGroupModal";


const CreateGroup: FC = () => {

  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <>
      <CreateButton
        onClick={() => setIsCreateGroupOpen(true)}
      // style={{display: user && [Roles.Root, Roles.Admin].includes(user.permission) ? "block" : "none"}}
      />
      <CreateGroupModal isOpen={isCreateGroupOpen} setIsOpen={setIsCreateGroupOpen}/>
    </>
  );
};

export default CreateGroup;