import SelectRecordsLocation from "./components/SelectRecordsLocation";
import Record from "./Record";
import RecordsWrapper from "./RecordsWrapper";
import useRecordsLocation from "../../store/useRecordsLocation";
import useRecords from "../../hooks/useRecords";
import { useEffect } from "react";
import useGroups from "../../hooks/useGroups";

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
            expirationDate={record.expiration_date ? new Date( record.expiration_date ) : undefined}
          />
        ))}
      </RecordsWrapper>
    </div>
  )
}

export default Records;