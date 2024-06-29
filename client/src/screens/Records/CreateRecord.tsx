import { FC } from "react";

import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./Records.module.scss";
import useRecordsLocation from "../../store/useRecordsLocation";

const CreateRecord: FC = () => {

  const {clansNotFoundError, listsNotFoundError} = useRecordsLocation()

  const isDisabled = clansNotFoundError || listsNotFoundError;

  return (
    <div className={classNames({[styles.createRecord]: true, [styles.createRecordDisabled]: isDisabled})}>
      <PlusOutlined/>
    </div>
  )
}

export default CreateRecord;