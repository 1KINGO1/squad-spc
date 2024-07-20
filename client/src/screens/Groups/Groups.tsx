import { FC } from "react";

import CreateGroup from "./CreateGroup";
import Group from "./Group";
import GroupsWrapper from "./GroupsWrapper";
import useGroups from "../../hooks/groups/useGroups";

const Groups: FC = () => {

  const {groups} = useGroups();

  return (
    <>
      <GroupsWrapper>
        {groups.map(group => (
          <Group key={group.id} group={group} />
        ))}
      </GroupsWrapper>
      <CreateGroup />
    </>

  );
}

export default Groups;