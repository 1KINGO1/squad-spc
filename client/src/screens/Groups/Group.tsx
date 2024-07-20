import { FC, useState } from "react";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./Groups.module.scss"
import { DeleteGroupModal } from "./modals/DeleteGroupModal";
import EditGroupModal from "./modals/EditGroupModal";
import usePermissions from "../../hooks/permissions/usePermissions";
import GroupType from "../../types/models/Group";
import Permission from "../../types/models/Permission";
import parseTextToColor from "../../utils/parseTextToColor";

interface GroupProps {
  group: GroupType
}

const Group: FC<GroupProps> = ({group}) => {
  const [isEditGroupModalOpen, setIsEditGroupModalOpen] = useState(false);
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);

  const groupColor = parseTextToColor(group.name, "groups");
  const {permissions} = usePermissions();

  const wrapperStyle = {"--border-color": groupColor[1]} as React.CSSProperties;

  return (
    <>
      <div className={styles.groupWrapper} style={wrapperStyle}>
        <div className={styles.groupLeftPart}>
          <div className={styles.groupHeader}>
            <p className={styles.groupName}>
              {group.name}
            </p>
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
        <div className={styles.groupRightPart}>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEditGroupModalOpen(true)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => setIsDeleteGroupModalOpen(true)}
            danger
          />
        </div>
      </div>
      <EditGroupModal isOpen={isEditGroupModalOpen} setIsOpen={setIsEditGroupModalOpen} group={group} />
      <DeleteGroupModal isOpen={isDeleteGroupModalOpen} setIsOpen={setIsDeleteGroupModalOpen} groupId={group.id} />
    </>
  )
}

export default Group;