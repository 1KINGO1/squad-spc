import { FC } from "react";
import styles from "../Records.module.scss";
import SelectListBar from "./SelectListBar";
import SelectClanBar from "./SelectClanBar";

const SelectRecordsLocation: FC = () => {
  return (
    <div className={styles.selectRecordsLocationWrapper}>
      <SelectListBar />
      <SelectClanBar />
    </div>
  );
};

export default SelectRecordsLocation;