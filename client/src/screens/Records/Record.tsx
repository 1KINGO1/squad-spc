import { FC, useState } from "react";

import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./Records.module.scss";
import Copyable from "../../components/Copyable";
import DateCountdown from "../../components/DateCountdown";
import useDeleteRecord from "../../hooks/useDeleteRecord";
import parseTextToColor from "../../utils/parseTextToColor";

interface RecordProps {
  userName: string;
  steamId: string;
  group: string;
  authorName: string;
  expirationDate?: Date;
  listId: number;
  clanId: number;
  recordId: number;
}

const Record: FC<RecordProps> = (
  {
    userName,
    steamId,
    group,
    expirationDate,
    authorName,
    clanId,
    listId,
    recordId
  }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteMutation = useDeleteRecord(
    {
      clanId,
      listId,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false)
    }
  );

  const nickColor = parseTextToColor(steamId, "id");
  const groupColor = parseTextToColor(group, "groups");

  const deleteHandler = () => {
    setIsLoading(true);
    deleteMutation.mutate({ recordId });
  };

  return (
    <div className={styles.record}>
      <p className={styles.recordName} style={{ border: `1px solid ${nickColor[1]}` }}>{userName}</p>
      <p className={styles.recordGroup}
         style={{ backgroundColor: groupColor[0], borderColor: groupColor[1] }}>{group}</p>
      <p className={styles.recordSteamId}>
        <Copyable text={steamId} />
      </p>

      {
        expirationDate && (
          <p className={styles.recordExpirationDate}>
            <DateCountdown date={expirationDate} />
          </p>
        )
      }
      <div className={styles.recordRightSideBar}>
        <Button icon={<UserOutlined />} disabled>
          {authorName}
        </Button>
        <Button icon={<DeleteOutlined />} danger onClick={deleteHandler} disabled={isLoading}/>
      </div>
    </div>
  );
};

export default Record;