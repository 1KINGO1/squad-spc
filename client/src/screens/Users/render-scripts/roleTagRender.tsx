import { MouseEvent } from "react";

import type { SelectProps } from "antd";

import UserTag from "../../../components/UserTag";

type TagRender = SelectProps["tagRender"];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <UserTag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      role={value}
    >
      {label}
    </UserTag>
  );
};

export default tagRender;