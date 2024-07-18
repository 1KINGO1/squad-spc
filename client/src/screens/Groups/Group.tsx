import GroupType from "../../types/models/Group";
import { FC, useState } from "react";
import styles from "./Groups.module.scss"
import parseTextToColor from "../../utils/parseTextToColor";
import usePermissions from "../../hooks/usePermissions";
import Permission from "../../types/models/Permission";
import { EditOutlined } from "@ant-design/icons";
import EditGroupModal from "./modals/EditGroupModal";

interface GroupProps {
  group: GroupType
}

const Group: FC<GroupProps> = ({group}) => {
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);

  const groupColor = parseTextToColor(group.name, "groups");
  const {permissions} = usePermissions();

  return (
    <>
      <div className={styles.groupWrapper} style={{ borderLeft: `5px solid ${groupColor[1]}` }}>

        <div className={styles.groupHeader}>
          <p className={styles.groupName}>
            {group.name}
          </p>
          <EditOutlined className={styles.editGroupButton} onClick={() => setIsEditGroupModalOpen(true)}/>
        </div>

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
      <EditGroupModal isOpen={isEditGroupModalOpen} setIsOpen={setIsEditGroupModalOpen} group={group}/>
    </>
  )
}

export default Group;