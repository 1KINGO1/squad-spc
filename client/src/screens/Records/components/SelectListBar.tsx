import { useEffect, useMemo, useState } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import useLists from "../../../hooks/useLists";
import { getRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import { AddListModal } from "../modals/AddListModal";
import styles from "../Records.module.scss";
import config from "../../../config";

const SelectListBar = () => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);

  const {listId, setListId, listsNotFoundError, setListsNotFoundError} = useRecordsLocation();

  const { lists, isLoading: isListsLoading } = useLists();
  const listsOptions = useMemo(
    () => !isListsLoading ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  // Set default list on load
  useEffect(() => {

    if (lists.length === 0 && !isListsLoading) {
      setListsNotFoundError(true);
      return;
    }

    if (!isListsLoading) {

      const listId = getRecordLocation().listId;

      if (lists.find(list => list.id === listId) === undefined){
        setListId(lists[0].id ?? 0);
        return;
      }

      setListId(listId ?? 0);

    }
  }, [lists]);

  return (
    <>
      <div className={styles.listsSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          value={isListsLoading ? 0 : listId}
          disabled={listsNotFoundError}
          onChange={setListId}
          placeholder="Search to Select"
          optionFilterProp="label"
          options={listsNotFoundError ? [{ value: 0, label: "You don't have accessible lists" }] : listsOptions}
        />

        <div className={styles.listsSelectButtonWrapper}>
          <Button
            icon={<PlusOutlined />}
            disabled={listsNotFoundError}
            onClick={() => setIsAddListModalOpen(true)}
          />
          <Button
            icon={<EditOutlined />}
            disabled={listsNotFoundError}
          />
          <Button
            icon={<ExportOutlined />}
            disabled={listsNotFoundError}
            onClick={() => window.location.href = config.apiBaseUrl + config.paths.output.path(lists.find(list => list.id === listId)?.path ?? "notfound")}
          />
          <Button
            icon={<DeleteOutlined />}
            disabled={listsNotFoundError}
          />
        </div>
      </div>
      <AddListModal isOpen={isAddListModalOpen} setIsOpen={setIsAddListModalOpen} />
    </>
  )
}

export default SelectListBar;