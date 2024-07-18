import { FC } from "react";

import Group from "./Group";
import GroupsWrapper from "./GroupsWrapper";
import useGroups from "../../hooks/useGroups";
import CreateGroup from "./CreateGroup";

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