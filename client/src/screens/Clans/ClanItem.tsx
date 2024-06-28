import React, { FC, useState } from "react";

import { EditOutlined, FileOutlined, PushpinOutlined, TeamOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./Clans.module.scss";
import ClanEditModal from "./modals/ClanEditModal";
import usePinnedClans from "../../store/usePinnedClans";
import Clan from "../../types/models/Clan";
import parseTextToColor from "../../utils/parseTextToColor";

interface ClanItemProps {
  clan: Clan
}

const ClanItem: FC<ClanItemProps> = ({clan}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {pinClan, unpinClan, pinnedClanIds} = usePinnedClans();
  const color = parseTextToColor(clan.name + clan.tag, "clan");

  const isClanPinned = pinnedClanIds.includes(clan.id);

  const pinHandler = () => {
    if (isClanPinned) {
      unpinClan(clan);
    }
    else {
      pinClan(clan);
    }
  }

  return (
    <>
      <div className={styles.clanItemWrapper} style={{ border: `1px solid ${color[1]}` }}>
        <div className={styles.clanItemTop} style={{ backgroundColor: color[0], border: `1px solid ${color[1]}` }}>
          <p>
            {clan.name}
          </p>
        </div>
        <div className={styles.clanItemBottom}>
          <Button type="primary" className={styles.editButton} onClick={() => setIsEditing(true)}>
            <EditOutlined /> Edit
          </Button>
          <Button type="primary" className={styles.limitsButton}>
            <UnlockOutlined /> Limits
          </Button>
          <Button type="primary" className={styles.managersButton}>
            <TeamOutlined /> Managers
          </Button>
          <Button type="primary" className={styles.managersButton}>
            <FileOutlined /> Records
          </Button>
          <Button type="primary" className={styles.managersButton} onClick={pinHandler}>
            <PushpinOutlined /> {isClanPinned ? "Unpin" : "Pin"}
          </Button>
        </div>
      </div>
      <ClanEditModal isOpen={isEditing}
                     setIsOpen={setIsEditing}
                     clan={clan}
      />
    </>
  )
}

export default ClanItem;