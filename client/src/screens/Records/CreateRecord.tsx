import { FC } from "react";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./Records.module.scss";

const CreateRecord: FC = () => {
  return (
    <div className={styles.createRecord}>
      <PlusOutlined/>
    </div>
  )
}

export default CreateRecord;