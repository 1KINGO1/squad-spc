import { FC } from "react";
import { Input } from "antd";
import styles from "../Records.module.scss";

interface RecordsFilterProps {
  filterValue: string;
  setFilterValue: (value: string) => void;
}

const RecordsFilter: FC<RecordsFilterProps> = ({filterValue, setFilterValue}) => {
  return (
    <div className={styles.filterRecordsWrapper}>
      <Input placeholder="Filter by name or steamID"
             value={filterValue}
             onChange={e => setFilterValue(e.target.value)}
      />
    </div>
  );
};

export default RecordsFilter;