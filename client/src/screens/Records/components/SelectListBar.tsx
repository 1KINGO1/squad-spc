import styles from "../Records.module.scss";

import { Button, Select } from "antd";
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import useLists from "../../../hooks/useLists";
import { useEffect, useMemo } from "react";
import useRecordsLocation from "../../../store/useRecordsLocation";

const SelectListBar = () => {

  const {listId, setListId} = useRecordsLocation();

  const { lists, isPending: isListsPending } = useLists();
  const listsOptions = useMemo(
    () => !isListsPending ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  // Set default list on load
  useEffect(() => {
    if (!isListsPending && lists[0]?.id !== undefined) {
      setListId(lists[0].id);
    }
  }, [lists]);

  return (
    <div className={styles.listsSelect}>
      <Select
        className={styles.selectInput}
        showSearch
        value={listId ?? 0}
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