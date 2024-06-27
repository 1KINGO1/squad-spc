import { FC } from "react";
import roleTagRender from "../render-scripts/roleTagRender";
import roleFilterOptions from "../data/roleFilterOptions";
import { Select } from "antd";

const SelectRolesFilter: FC = () => {
  return (
    <Select
      tagRender={roleTagRender}
      mode="multiple"
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