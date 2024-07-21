import { FC } from "react";

import { Select } from "antd";

import roleFilterOptions from "../data/roleFilterOptions";
import roleTagRender from "../render-scripts/roleTagRender";
import useUsersFilter from "../../../store/useUsersFilter";

const SelectRolesFilter: FC = () => {
  const {roles, setRoles} = useUsersFilter();

  return (
    <Select
      tagRender={roleTagRender}
      mode="multiple"
      onChange={(values) => setRoles(values)}
      value={roles}
      showSearch
      style={{ width: 350 }}
      placeholder="Filter by role"
      optionFilterProp="label"
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
      }
      maxTagCount="responsive"
      options={roleFilterOptions}
    />
  )
}

export default SelectRolesFilter;