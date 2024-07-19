import { useEffect, useState } from "react";

import RecordsFilter from "./components/RecordsFilter";
import SelectRecordsLocation from "./components/SelectRecordsLocation";
import CreateRecord from "./CreateRecord";
import Record from "./Record";
import RecordsWrapper from "./RecordsWrapper";
import useGroups from "../../hooks/useGroups";
import useRecords from "../../hooks/useRecords";
import useRecordsLocation from "../../store/useRecordsLocation";

const Records = () => {
  const [filterValue, setFilterValue] = useState("");

  const { listId, clanId } = useRecordsLocation();
  const { groups } = useGroups();
  const { records, enable } = useRecords(listId, clanId);

  useEffect(() => {
    if (listId && clanId) {
      enable();
    }
  }, [listId, clanId]);

  return (
    <div>
      <SelectRecordsLocation />
      <RecordsFilter filterValue={filterValue} setFilterValue={setFilterValue} />
      <RecordsWrapper>
        {records
          .filter(record =>
            record.username.toLowerCase().startsWith(filterValue.toLowerCase()) ||
            record.steam_id.toLowerCase().startsWith(filterValue.toLowerCase())
          )
          .map((record) => (
            <Record
              key={record.id}
              userName={record.username}
              steamId={record.steam_id}
              group={groups.find(group => group.id === record.group.id)?.name ?? record.group.name}
              authorName={record.author.username}
              expirationDate={record.expire_date ? new Date(record.expire_date) : undefined}
              listId={listId}
              clanId={clanId}
              recordId={record.id}
            />
          ))}
      </RecordsWrapper>
      <CreateRecord />
    </div>
  );
};

export default Records;