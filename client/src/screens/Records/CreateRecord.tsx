import { FC, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import CreateRecordModal from "./modals/CreateRecordModal";
import styles from "./Records.module.scss";
import useRecordsLocation from "../../store/useRecordsLocation";
import { FloatButton } from "antd";
import CreateButton from "../../components/CreateButton";

const CreateRecord: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {clansNotFoundError, listsNotFoundError} = useRecordsLocation()

  const isDisabled = clansNotFoundError || listsNotFoundError;

  return (
    <>
      <CreateButton onClick={() => setIsOpen(true)} style={{display: isDisabled ? "none" : undefined}}/>
      <CreateRecordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>

  )
}

export default CreateRecord;