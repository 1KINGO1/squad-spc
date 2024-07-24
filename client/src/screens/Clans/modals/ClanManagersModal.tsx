import { FC } from "react";

import { Button, Modal, Typography } from "antd";

import Clan from "../../../types/models/Clan";
import ClanManagerItem from "./shared/ClanManagerItem";

interface ClanManagersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clan: Clan;
}

export const ClanManagersModal: FC<ClanManagersProps> = (props) => {

  const handleCancel = () => props.setIsOpen(false);

  return (
    <Modal
      open={props.isOpen}
      title={props.clan.name + " Managers"}
      onCancel={handleCancel}
      footer={null}
    >
      {props?.clan?.clan_leaders?.length > 0 ?
        props.clan.clan_leaders.map((manager) => (<ClanManagerItem user={manager} key={manager.id} clanId={props.clan.id} />))
        : "No managers found for this clan."}
    </Modal>
  );
};