import { useEffect, useMemo, useState } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popover, Select } from "antd";

import config from "../../../config";
import useLists from "../../../hooks/lists/useLists";
import { getRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import List from "../../../types/models/List";
import { AddListModal } from "../modals/AddListModal";
import { DeleteListModal } from "../modals/DeleteListModal";
import { EditListModal } from "../modals/EditListModal";
import styles from "../Records.module.scss";
import useIsAdmin from "../../../hooks/users/useIsAdmin";

const SelectListBar = () => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);

  const { listId, setListId, listsNotFoundError, setListsNotFoundError } = useRecordsLocation();

  const { lists, isLoading: isListsLoading } = useLists();
  const listsOptions = useMemo(
    () => !isListsLoading ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  const isAdmin = useIsAdmin();

  // Set default list on load
  useEffect(() => {

    if (lists.length === 0 && !isListsLoading) {
      setListsNotFoundError(true);
      return;
    }

    if (!isListsLoading) {

      const listId = getRecordLocation().listId;

      if (lists.find(list => list.id === listId) === undefined) {
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
          loading={isListsLoading}
          disabled={listsNotFoundError}
          onChange={setListId}
          placeholder="Search to Select"
          optionFilterProp="label"
          options={listsNotFoundError ? [{ value: 0, label: "You don't have accessible lists" }] : listsOptions}
        />

        {isAdmin && (
          <div className={styles.listsSelectButtonWrapper}>
            <Popover content="Create a list">
              <Button
                icon={<PlusOutlined />}
                onClick={() => setIsAddListModalOpen(true)}
              />
            </Popover>
            <Popover content="Edit the list">
              <Button
                icon={<EditOutlined />}
                disabled={listsNotFoundError}
                onClick={() => setIsEditListModalOpen(true)}
              />
            </Popover>
            <Popover content="Redirect to output path">
              <Button
                icon={<ExportOutlined />}
                disabled={listsNotFoundError}
                onClick={() => window.open(config.apiBaseUrl + config.paths.output.path(lists.find(list => list.id === listId)?.path ?? "notfound"))}
              />
            </Popover>
            <Popover content="Delete the list">
              <Button
                icon={<DeleteOutlined />}
                disabled={listsNotFoundError}
                onClick={() => setIsDeleteListModalOpen(true)}
              />
            </Popover>
          </div>
        )}

      </div>
      <AddListModal isOpen={isAddListModalOpen} setIsOpen={setIsAddListModalOpen} />
      {
        listId && lists.find(list => list.id === listId) ? (
          <>
            <DeleteListModal isOpen={isDeleteListModalOpen} setIsOpen={setIsDeleteListModalOpen} listId={listId} />
            <EditListModal isOpen={isEditListModalOpen} setIsOpen={setIsEditListModalOpen}
                           list={lists.find(list => list.id === listId) as List} />
          </>
        ) : null
      }
    </>
  );
};

export default SelectListBar;
