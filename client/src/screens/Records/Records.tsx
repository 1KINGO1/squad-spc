import SelectRecordsLocation from "./SelectRecordsLocation";
import RecordsWrapper from "./RecordsWrapper";
import Record from "./Record";

const Records = () => {
  return (
    <div>
      <SelectRecordsLocation />
      <RecordsWrapper>
        <Record userName="KINGO" steamId="76561198990669262" group={"WHITELIST"} authorName="author1" expirationDate={new Date(Date.now() + 1000 * 60 * 60 * 25 * 1.023 )}/>
        <Record userName="aboba" steamId="76561198061788436" group={"MODARATOR"} authorName="author3" />
        <Record userName="aboba" steamId="76561198088834273" group={"GAME MASTER"} authorName="author3" />
        <Record userName="aboba" steamId="76561198201646397" group={"GUEST"} authorName="author3" />
        <Record userName="aboba" steamId="76561198888290148" group={"CLANWHITELIST"} authorName="author3" />
      </RecordsWrapper>
    </div>
  )
}

export default Records;