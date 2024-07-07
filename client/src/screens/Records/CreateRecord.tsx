import { FC, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./Records.module.scss";
import useRecordsLocation from "../../store/useRecordsLocation";
import CreateRecordModal from "./modals/CreateRecordModal";

const CreateRecord: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {clansNotFoundError, listsNotFoundError} = useRecordsLocation()

  const isDisabled = clansNotFoundError || listsNotFoundError;

  return (
    <>
      <div
        className={classNames({ [styles.createRecord]: true, [styles.createRecordDisabled]: isDisabled })}
        onClick={() => !isDisabled && setIsOpen(true)}
      >
        <PlusOutlined />
      </div>
      <CreateRecordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}

export default CreateRecord;