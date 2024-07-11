import { FC } from "react";
import useGroups from "../../hooks/useGroups";
import GroupsWrapper from "./GroupsWrapper";
import Group from "./Group";

const Groups: FC = () => {

  const {groups} = useGroups();

  return (
    <GroupsWrapper>
      {groups.map(group => (
        <Group key={group.id} group={group} />
      ))}
    </GroupsWrapper>
  );
}

export default Groups;