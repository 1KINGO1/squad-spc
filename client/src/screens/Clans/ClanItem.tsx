import React, { FC } from "react";
import styles from './Clans.module.scss';
import textToHexColor from "../../utils/textToHexColor";
import { Button } from "antd";
import { EditOutlined, FileOutlined, PushpinOutlined, TeamOutlined, UnlockOutlined } from "@ant-design/icons";

interface ClanItemProps {
  name: string;
  tag: string;
}

const ClanItem: FC<ClanItemProps> = ({name, tag}) => {

  const color = textToHexColor(name + tag);

  return (
    <div className={styles.clanItemWrapper} style={{border: `1px solid ${color[1]}`}}>
      <div className={styles.clanItemTop} style={{backgroundColor: color[0], border: `1px solid ${color[1]}`}}>
        <p>
          {name}
        </p>
      </div>
      <div className={styles.clanItemBottom}>
        <Button type="primary" className={styles.editButton}>
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
  )
}

export default ClanItem;