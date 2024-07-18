import { FC } from "react";

import Group from "./Group";
import GroupsWrapper from "./GroupsWrapper";
import useGroups from "../../hooks/useGroups";

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