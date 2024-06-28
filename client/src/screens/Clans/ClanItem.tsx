import React, { FC, useState } from "react";
import styles from './Clans.module.scss';
import parseTextToColor from "../../utils/parseTextToColor";
import { Button } from "antd";
import { EditOutlined, FileOutlined, PushpinOutlined, TeamOutlined, UnlockOutlined } from "@ant-design/icons";
import ClanEditModal from "./ClanEditModal";
import Clan from "../../types/Clans";

interface ClanItemProps {
  clan: Clan
}

const ClanItem: FC<ClanItemProps> = ({clan}) => {
  const [isEditing, setIsEditing] = useState(false);

  const color = parseTextToColor(clan.name + clan.tag, 'clan');

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
          <Button type="primary" className={styles.managersButton}>
            <PushpinOutlined /> Pin
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