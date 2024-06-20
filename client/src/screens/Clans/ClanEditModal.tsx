import { FC, useState } from "react";
import { Button, Form, Input, Modal } from "antd";

interface ClanEditModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  clanName: string;
  tag: string
}

const ClanEditModal: FC<ClanEditModalProps> = (props) => {
  const handleOk = () => {
    props.handleOk();
  }

  const handleCancel = () => {
    props.handleCancel();
  }

  return (
    <Modal
      open={props.isOpen}
      title={"Edit " + props.clanName}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,

      ]}
    >
      <Form
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          layout="vertical"
          label="Clan Name"
          name="clan-name"
          initialValue={props.clanName}
          rules={[{ max: 50, min: 4 }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Clan Tag"
          name="clan-tag"
          initialValue={props.tag}
          rules={[{ max: 10, min: 1 }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ClanEditModal;