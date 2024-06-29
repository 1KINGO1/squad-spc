import { useEffect, useMemo } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import useLists from "../../../hooks/useLists";
import { getRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import styles from "../Records.module.scss";

const SelectListBar = () => {
  const {listId, setListId} = useRecordsLocation();

  const { lists, isLoading: isListsLoading } = useLists();
  const listsOptions = useMemo(
    () => !isListsLoading ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  // Set default list on load
  useEffect(() => {
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
    <div className={styles.listsSelect}>
      <Select
        className={styles.selectInput}
        showSearch
        value={isListsLoading ? 0 : listId}
        onChange={setListId}
        placeholder="Search to Select"
        optionFilterProp="label"
        options={listsOptions}
      />

      <div className={styles.listsSelectButtonWrapper}>
        <Button icon={<PlusOutlined />} />
        <Button icon={<EditOutlined />} />
        <Button icon={<ExportOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </div>
    </div>
  )
}

export default SelectListBar;