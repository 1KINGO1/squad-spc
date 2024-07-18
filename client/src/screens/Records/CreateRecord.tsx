import { FC, useState } from "react";

import CreateRecordModal from "./modals/CreateRecordModal";
import CreateButton from "../../components/CreateButton";
import useRecordsLocation from "../../store/useRecordsLocation";

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