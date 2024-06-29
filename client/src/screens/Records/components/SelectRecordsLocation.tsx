import { FC, useEffect } from "react";

import SelectClanBar from "./SelectClanBar";
import SelectListBar from "./SelectListBar";
import { setRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import styles from "../Records.module.scss";

const SelectRecordsLocation: FC = () => {

  const {clanId, listId} = useRecordsLocation();

  useEffect(() => {
    if (clanId && listId){
      setRecordLocation(listId, clanId);
    }
  }, [clanId, listId]);

  return (
    <div className={styles.selectRecordsLocationWrapper}>
      <SelectListBar />
      <SelectClanBar />
    </div>
  );
};

export default SelectRecordsLocation;