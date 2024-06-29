import { useEffect, useMemo, useState } from "react";

import { Button, Select } from "antd";

import useListClans from "../../../hooks/useListClans";
import { getRecordLocation } from "../../../services/storage/record-location.service";
import useRecordsLocation from "../../../store/useRecordsLocation";
import styles from "../Records.module.scss";

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
        placeholder="Search to Select"
        optionFilterProp="label"
        disabled={clansNotFoundError}
        options={clansNotFoundError ? [{value: 0, label: "You don't have accessible clans"}] : clansOptions}
      />
      <div className={styles.clansSelectInfoWrapper}>
        <Button disabled block>
          Total: 99
        </Button>
      </div>
    </div>
  )
}

export default SelectClanBar;