import { FC, useState } from "react";

import { message } from "antd";

interface CopyableProps {
  text: string;
}

const Copyable: FC<CopyableProps> = ({ text }) => {

  const [isCopied, setCopied] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const clickHandler = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(text);

    messageApi.info("Copied " + text, 3);

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      {contextHolder}

      <span style={{
        color: "inherit",
        fontSize: "1em",
        cursor: "pointer",
        position: "relative"
      }} onClick={clickHandler}>

      {text}

    </span>
    </>
  );
};

export default Copyable;