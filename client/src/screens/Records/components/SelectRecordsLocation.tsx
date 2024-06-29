import { FC, useEffect, useMemo, useState } from "react";

import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

import useListClans from "../../../hooks/useListClans";
import useLists from "../../../hooks/useLists";
import styles from "../Records.module.scss";

const SelectRecordsLocation: FC = () => {

  const [selectedList, setSelectedList] = useState<number>(0);
  const [selectedClan, setSelectedClan] = useState<number>(0);

  const { lists, isPending: isListsPending } = useLists();
  const listsOptions = useMemo(
    () => !isListsPending ? lists.map(list => ({ value: list.id, label: list.name })) : [],
    [lists]);

  const { clans, isPending: isClansPending, enableClanFetch } = useListClans(selectedList);
  const clansOptions = useMemo(
    () => !isClansPending ?
      clans
        .sort((clan1, clan2) => clan1.id - clan2.id)
        .map(clan => ({ value: clan.id, label: clan.tag + " " + clan.name }))
      : []
    ,[clans]);

  // Set default list on load
  useEffect(() => {
    if (!isListsPending && lists[0]?.id !== undefined) {
      handleListChange(lists[0].id);
    }
  }, [lists]);

  // Set default clan on load
  useEffect(() => {
    if (!isClansPending && clans[0]?.id !== undefined) {
      handlerClanChange(clans[0].id);
    }
  }, [clans]);

  const handleListChange = (listId: number) => {
    setSelectedList(listId);
    enableClanFetch();
  };

  const handlerClanChange = (clanId: number) => {
    setSelectedClan(clanId);
  }

  return (
    <div className={styles.selectRecordsLocationWrapper}>
      <div className={styles.listsSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          value={selectedList}
          onChange={setSelectedList}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listsOptions}
        />

        <div className={styles.listsSelectButtonWrapper}>
          <Button icon={<PlusOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<ExportOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </div>
      </div>
      <div className={styles.clansSelect}>
        <Select
          className={styles.selectInput}
          showSearch
          value={selectedClan}
          onChange={setSelectedClan}
          placeholder="Search to Select"
          optionFilterProp="label"
          options={clansOptions}
        />
        <div className={styles.clansSelectInfoWrapper}>
          <Button disabled block>
            Total: 99
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectRecordsLocation;