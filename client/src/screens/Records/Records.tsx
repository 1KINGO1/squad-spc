import { useEffect } from "react";

import SelectRecordsLocation from "./components/SelectRecordsLocation";
import Record from "./Record";
import RecordsWrapper from "./RecordsWrapper";
import useGroups from "../../hooks/useGroups";
import useRecords from "../../hooks/useRecords";
import useRecordsLocation from "../../store/useRecordsLocation";
import CreateRecord from "./CreateRecord";

const Records = () => {
  const {listId, clanId} = useRecordsLocation();
  const {groups} = useGroups();
  const {records, enable} = useRecords(listId, clanId);

  useEffect(() => {
    if (listId && clanId) {
      enable();
    }
  }, [listId, clanId]);

  return (
    <div>
      <SelectRecordsLocation />
      <RecordsWrapper>
        {records.map((record) => (
          <Record
            key={record.id}
            userName={record.username}
            steamId={record.steam_id}
            group={groups.find(group => group.id === record.group.id)?.name ?? record.group.name}
            authorName={record.author.username}
            expirationDate={record.expire_date ? new Date( record.expire_date ) : undefined}
            listId={listId}
            clanId={clanId}
            recordId={record.id}
          />
        ))}
      </RecordsWrapper>
      <CreateRecord />
    </div>
  )
}

export default Records;