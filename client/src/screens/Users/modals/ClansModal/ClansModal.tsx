import { FC, useEffect, useState } from "react";

import { Button, Modal } from "antd";

import User from "../../../../types/models/User";
import useUserClans from "../../../../hooks/users/useUserClans";
import Clan from "../../../../types/models/Clan";
import useClans from "../../../../hooks/clans/useClans";
import { ClanItem } from "./ClanItem";
import ClanSelect from "./ClanSelect";

interface ClansModalProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ClansModal: FC<ClansModalProps> = ({isOpen, setIsOpen, user}) => {

  const [clans, setClans] = useState<Clan[]>([]);

  const userClans = useUserClans(user);

  const handleOk = () => setIsOpen(false);
  const handleCancel = () => setIsOpen(false);

  useEffect(() => {
    setClans(userClans);
  }, [userClans]);

  return (
    <Modal
      title="Change user clans"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {clans.map((clan) => (
        <ClanItem clan={clan} key={clan.id} isSelected={true} user={user}/>
      ))}
      <ClanSelect user={user}/>
    </Modal>
  )
}

export default ClansModal;