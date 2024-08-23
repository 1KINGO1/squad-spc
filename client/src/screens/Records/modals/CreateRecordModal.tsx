import { FC, useEffect, useState } from "react";

import { Button, Form, Input, message, Modal, Select } from "antd";

import DurationInput from "../../../components/DurationInput";
import useClanLimits from "../../../hooks/clans/useClanLimits";
import useGroups from "../../../hooks/groups/useGroups";
import useCreateRecord from "../../../hooks/records/useCreateRecord";
import useRecords from "../../../hooks/records/useRecords";
import useRecordsLocation from "../../../store/useRecordsLocation";
import styles from "../Records.module.scss";

interface CreateRecordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface FormValues {
  username: string;
  steam_id: string;
  group: number;
  duration: {
    value: number;
    unit: number;
  }
}

const CreateRecordModal: FC<CreateRecordModalProps> = ({ isOpen, setIsOpen }) => {
  const [submittable, setSubmittable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm<FormValues>();
  const values = Form.useWatch([], form);

  const {groups} = useGroups();

  const { clanId, listId } = useRecordsLocation();
  const { records } = useRecords(listId, clanId);
  const { limits } = useClanLimits(clanId);

  const mutation = useCreateRecord({
    clanId,
    listId,
    onSuccess: () => {
      setIsOpen(false);
      setLoading(false);
    },
    onError: (errorMessage) => {
      message.error(errorMessage);
      setLoading(false);
    }
  });


  const handleOk = () => {
    setLoading(true);
    mutation.mutate({
      listId,
      clanId,
      username: values.username,
      steam_id: values.steam_id,
      group_id: values.group,
      expire_date: values.duration.value > 0 ? new Date(Date.now() + values.duration.value * 1000 * values.duration.unit) : undefined
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(true);
      })
      .catch(() => setSubmittable(false));
  }, [values, form]);

  useEffect(() => {
    return () => {
      form.resetFields();
      setLoading(false);
      setSubmittable(false);
    };
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      title={"Create new record"}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} loading={loading}>
          Cancel
        </Button>,
        <Button key="submit"
                type="primary"
                onClick={handleOk}
                disabled={!submittable}
                loading={loading}
        >
          Create
        </Button>
      ]}
    >
      <Form form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="vertical"
      >
        <Form.Item
          layout="vertical"
          label="Username"
          name="username"
          rules={[{ max: 100, min: 1, required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="SteamID 64"
          name="steam_id"
          rules={[{ max: 17, min: 17, required: true, message: "SteamID 64 must be 17 characters long" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Select a group"
          name="group"
          rules={[{ required: true, message: "Select record group" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select placeholder="Select a role"
                  notFoundContent=":( This clan doesn't have allowed groups. Add one in Clans section.">
            {limits.map(limit => {

                const usedGroupsCount = records.filter(record => record.group.id === limit.group.id).length;
                let color;

                if (!limit.limit) color = "green";
                else if (usedGroupsCount >= limit.limit) color = "red";
                else if (usedGroupsCount >= limit.limit / 2) color = "yellow";
                else color = "green";

                const isDisabled = usedGroupsCount >= (limit.limit ?? Infinity);

                const groupName = groups.find(group => group.id === limit.group.id)?.name ?? limit.group.name;

                return (
                  <Select.Option key={limit.group.id} value={limit.group.id} disabled={isDisabled}>
                    {groupName} <span style={{ color }}>{usedGroupsCount} / {limit.limit ?? "∞"}</span>
                  </Select.Option>
                );
              }
            )}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Duration"
        >
          <DurationInput
            inputDurationClassName={styles.createRecordDurationInput}
            inputUnitClassName={styles.createRecordUnitInput}
            placeholder="No expiration date"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRecordModal;