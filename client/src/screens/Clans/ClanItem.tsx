import React, { FC, useState } from "react";

import { CloseCircleOutlined, EditOutlined, PushpinOutlined, TeamOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./Clans.module.scss";
import ClanEditModal from "./modals/ClanEditModal";
import { DeleteClanModal } from "./modals/DeleteClanModal";
import usePinnedClans from "../../store/usePinnedClans";
import Clan from "../../types/models/Clan";
import parseTextToColor from "../../utils/parseTextToColor";
import { ClanManagersModal } from "./modals/ClanManagersModal";
import useIsAdmin from "../../hooks/users/useIsAdmin";

interface ClanItemProps {
  clan: Clan;
}

const ClanItem: FC<ClanItemProps> = ({ clan }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isManagersModalOpen, setIsManagersModalOpen] = useState(false);

  const { pinClan, unpinClan, pinnedClanIds } = usePinnedClans();

  const color = parseTextToColor(clan.name + clan.tag, "clan");
  const isClanPinned = pinnedClanIds.includes(clan.id);

  const isAdmin = useIsAdmin();

  const pinHandler = () => {
    if (isClanPinned) {
      unpinClan(clan);
    } else {
      pinClan(clan);
    }
  };

  return (
    <>
      <div className={styles.clanItemWrapper} style={{ border: `1px solid ${color[1]}` }}>
        <div className={styles.clanItemTop} style={{ backgroundColor: color[0], border: `1px solid ${color[1]}` }}>
          <p>
            {clan.name}
          </p>
        </div>
        <div className={styles.clanItemBottom}>
          {isAdmin && (
            <Button type="primary" className={styles.editButton} onClick={() => setIsEditing(true)}>
              <EditOutlined /> Edit
            </Button>
          )}

          <Button type="primary" className={styles.managersButton} onClick={() => setIsManagersModalOpen(true)}>
            <TeamOutlined /> Managers
          </Button>

          <Button type="primary" className={styles.managersButton} onClick={pinHandler}>
            <PushpinOutlined /> {isClanPinned ? "Unpin" : "Pin"}
          </Button>

          {isAdmin && (
            <Button type="primary"
                    danger
                    className={styles.managersButton}
                    onClick={() => setIsDeleteModalOpen(true)}
                    loading={isDeleteModalOpen}>
              <CloseCircleOutlined /> Delete
            </Button>
          )}
        </div>
      </div>
      <ClanEditModal isOpen={isEditing}
                     setIsOpen={setIsEditing}
                     clan={clan}
      />
      <DeleteClanModal isOpen={isDeleteModalOpen}
                       setIsOpen={setIsDeleteModalOpen}
                       clanId={clan.id}
      />
      <ClanManagersModal isOpen={isManagersModalOpen}
                         setIsOpen={setIsManagersModalOpen}
                         clan={clan}
      />
    </>
  );
};

export default ClanItem;