import styles from "../Records.module.scss";
import { Button, Select } from "antd";
import useListClans from "../../../hooks/useListClans";
import { useEffect, useMemo } from "react";
import useRecordsLocation from "../../../store/useRecordsLocation";

const SelectClanBar = () => {

  const {listId, clanId, setClanId} = useRecordsLocation();

  const { clans, isPending: isClansPending, enableClanFetch } = useListClans(listId ?? 0);
  const clansOptions = useMemo(
    () => !isClansPending ?
      clans
        .sort((clan1, clan2) => clan1.id - clan2.id)
        .map(clan => ({ value: clan.id, label: clan.tag + " " + clan.name }))
      : []
    ,[clans]);

  // Set default clan on load
  useEffect(() => {
    if (!isClansPending && clans[0]?.id !== undefined) {
      setClanId(clans[0].id);
    }
  }, [clans]);

  useEffect(() => {
    if (listId) enableClanFetch();
  }, [listId])

  return (
    <div className={styles.clansSelect}>
      <Select
        className={styles.selectInput}
        showSearch
        value={clanId}
        onChange={setClanId}
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
  )
}

export default SelectClanBar;