import { FC } from "react";

import { Tag } from "antd";

import { Roles } from "../types/Roles";

interface UserTagProps {
  role: Roles | null;
  [key: string]: any;
}

const UserTag: FC<UserTagProps> = ({role, ...rest}) => {

  let color;

  switch (role) {
    case Roles.Root:
      color = "volcano";
      break;
    case Roles.Admin:
      color = "gold";
      break;
    case Roles.ClanLeaders:
      color = "blue";
      break;
    case Roles.Guest:
      color = "green";
      break;
    default:
      color = "default";
  }

  return (
    <Tag color={color} {...rest}>
      {role !== null ? Roles[role] : "Loading"}
    </Tag>
  )
}

export default UserTag;