import { FC, useEffect, useMemo } from "react";
import useLists from "../../../hooks/lists/useLists";
import { Select } from "antd";
import styles from "../Products.module.scss";

interface SelectListProps {
  listId: number,
  setListId: (id: number) => void;
}

const SelectList: FC<SelectListProps> = ({listId, setListId}) => {
  const { lists, isLoading: isListsLoading } = useLists();
  const listsOptions = useMemo(
    () => !isListsLoading ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  useEffect(() => {
    if (lists.length === 0) {
      return;
    }

    if (!isListsLoading) {
      setListId(lists[0].id);
    }
  }, [lists]);

  return (
    <Select
      className={styles.selectList}
      showSearch
      value={isListsLoading ? 0 : listId}
      loading={isListsLoading}
      disabled={!listsOptions.length}
      onChange={setListId}
      placeholder="Search to Select"
      optionFilterProp="label"
      options={!listsOptions.length ? [{ value: 0, label: "You don't have accessible lists" }] : listsOptions}
    />
  );
};

export default SelectList;