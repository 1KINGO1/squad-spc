import { useEffect, useMemo } from "react";

import { CloseSquareOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Popover, Select } from "antd";

import useListClans from "../../../hooks/lists/useListClans";
import { getRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import styles from "../Records.module.scss";
import useIsAdmin from "../../../hooks/users/useIsAdmin";

const SelectClanBar = () => {
  const {
    listId,
    clanId,
    setClanId,
    listsNotFoundError,
    clansNotFoundError,
    setClansNotFoundError
  } = useRecordsLocation();

  const { clans, isLoading: isClansLoading, enableClanFetch } = useListClans(listId ?? 0);
  const isAdmin = useIsAdmin();

  const clansOptions = useMemo(
    () => !isClansLoading ?
      clans
        .sort((clan1, clan2) => clan1.id - clan2.id)
        .map(clan => ({ value: clan.id, label: clan.tag + " " + clan.name }))
      : []
    ,[clans]);

  // Set default clan on load
  useEffect(() => {

    if (clans.length === 0 && !isClansLoading){
      setClansNotFoundError(true);
      return;
    }

    setClansNotFoundError(false);

    if (!isClansLoading){

      const clanId = getRecordLocation().clanId;

      if (clans.find(clan => clan.id === clanId) === undefined){
        setClanId(clans[0].id ?? 0);
        return;
      }

      setClanId(clanId ?? 0);
    }
  }, [clans]);

  useEffect(() => {
    if (listsNotFoundError) {
      setClansNotFoundError(true);
      return;
    }
    if (listId) enableClanFetch();
  }, [listId, listsNotFoundError])

  return (
    <div className={styles.clansSelect}>
      <Select
        className={styles.selectInput}
        showSearch
        value={clanId}
        onChange={setClanId}
        loading={isClansLoading}
        placeholder="Search to Select"
        optionFilterProp="label"
        disabled={clansNotFoundError}
        options={clansNotFoundError ? [{value: 0, label: "You don't have accessible clans"}] : clansOptions}
      />
      {isAdmin && (
        <div className={styles.clansSelectInfoWrapper}>
          <Popover content="Import records to current clan from foreign resourse">
            <Button
              icon={<CloudDownloadOutlined />}
              disabled={true}
            />
          </Popover>
          <Popover content="Purge clan records in this list">
            <Button
              icon={<CloseSquareOutlined />}
              disabled={true}
            />
          </Popover>

          {/*<Button disabled>*/}
          {/*  Total: 99*/}
          {/*</Button>*/}
        </div>
      )}
    </div>
  )
}

export default SelectClanBar;