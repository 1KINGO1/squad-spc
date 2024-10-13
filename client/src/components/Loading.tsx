import { Flex, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <Flex justify="center" align="center" gap="middle">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
    </Flex>
  )
}

export default Loading;
