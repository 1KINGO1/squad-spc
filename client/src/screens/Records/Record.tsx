import styles from './Records.module.scss';
import { FC } from "react";
import parseTextToColor from "../../utils/parseTextToColor";
import DateCountdown from "../../components/DateCountdown";
import { MoreOutlined } from '@ant-design/icons';
import { Button } from "antd";
import Copyable from "../../components/Copyable";
import parseSteamIdToHash from "../../utils/parseSteamIdToHash";

interface RecordProps {
  userName: string;
  steamId: string;
  group: string;
  authorName: string;
  expirationDate?: Date;
}

const Record: FC<RecordProps> = ({userName, steamId, authorName, group, expirationDate}) => {

  const nickColor = parseTextToColor(parseSteamIdToHash(steamId), 'id');
  const groupColor = parseTextToColor(group, 'groups');

  return (
    <div className={styles.record}>
      <p className={styles.recordName} style={{backgroundColor: nickColor[0]}}>{userName}</p>
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