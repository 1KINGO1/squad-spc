import GroupType from "../../types/models/Group";
import { FC } from "react"
import styles from "./Groups.module.scss"
import parseTextToColor from "../../utils/parseTextToColor";
import usePermissions from "../../hooks/usePermissions";
import Permission from "../../types/models/Permission";
import { EditOutlined } from "@ant-design/icons";

interface GroupProps {
  group: GroupType
}

const Group: FC<GroupProps> = ({group}) => {
  const groupColor = parseTextToColor(group.name, "groups");
  const {permissions} = usePermissions();

  return (
    <div className={styles.groupWrapper} style={{borderLeft: `5px solid ${groupColor[1]}`}}>

      <div className={styles.groupHeader}>
        <p className={styles.groupName}>
          {group.name}
        </p>
        <EditOutlined className={styles.editGroupButton} />
      </div>


      {/*<Select*/}
      {/*  mode="multiple"*/}
      {/*  style={{ width: "100%" }}*/}
      {/*  showSearch={true}*/}
      {/*  defaultValue={group.permissions.map(({ value }) => value)}*/}
      {/*  options={permissions?.map(permission => ({ label: permission.name, value: permission.value }))}*/}
      {/*/>*/}

      <div className={styles.groupPermissionsWrapper}>
        {permissions?.length ? group.permissions.map(({ id }) => {
          const permission = permissions.find(permission => permission.id === id) as Permission;

          return (
            <span key={permission.id} className={styles.permissionTag}>
              {permission.name}
            </span>
          )
        }) : "Loading..."}
      </div>
    </div>
  )
}

export default Group;