import { FC, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import CreateRecordModal from "./modals/CreateRecordModal";
import styles from "./Records.module.scss";
import useRecordsLocation from "../../store/useRecordsLocation";
import { FloatButton } from "antd";

const CreateRecord: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {clansNotFoundError, listsNotFoundError} = useRecordsLocation()

  const isDisabled = clansNotFoundError || listsNotFoundError;

  return (
    <>
      <FloatButton icon={<PlusOutlined />}
                   type="primary"
                   style={{display: isDisabled ? "none" : undefined}}
                   onClick={() => setIsOpen(true)}
                   shape="square"
                   className={styles.createRecord}
      />
      <CreateRecordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}

export default CreateRecord;