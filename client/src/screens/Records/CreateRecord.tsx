import { FC } from "react";
import styles from './Records.module.scss';
import { PlusOutlined } from "@ant-design/icons";

const CreateRecord: FC = () => {
  return (
    <div className={styles.createRecord}>
      <PlusOutlined/>
    </div>
  )
}

export default CreateRecord;