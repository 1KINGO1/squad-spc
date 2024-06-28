import { FC } from "react";

import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./Records.module.scss";
import Copyable from "../../components/Copyable";
import DateCountdown from "../../components/DateCountdown";
import parseTextToColor from "../../utils/parseTextToColor";

interface RecordProps {
  userName: string;
  steamId: string;
  group: string;
  authorName: string;
  expirationDate?: Date;
}

const Record: FC<RecordProps> = ({userName, steamId, group, expirationDate}) => {

  const nickColor = parseTextToColor(steamId, "id");
  const groupColor = parseTextToColor(group, "groups");

  return (
    <div className={styles.record}>
      <p className={styles.recordName} style={{border: `1px solid ${nickColor[1]}`}}>{userName}</p>
      <p className={styles.recordGroup} style={{backgroundColor: groupColor[0], borderColor: groupColor[1]}}>{group}</p>
      <p className={styles.recordSteamId}>
        <Copyable text={steamId}/>
      </p>

      {
        expirationDate && (
          <p className={styles.recordExpirationDate}>
            <DateCountdown date={expirationDate} />
          </p>
        )
      }

      <Button icon={<MoreOutlined />} className={styles.recordShowMoreButton}/>
    </div>
  )
}

export default Record;