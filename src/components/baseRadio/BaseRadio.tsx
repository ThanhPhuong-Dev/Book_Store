import React from 'react';
import { Radio } from 'antd';
import { WrapperRadio } from './style';
function BaseRadio({ radio, setRadio }) {
  const onChange = (e) => {
    setRadio(e.target.value);
  };
  return (
    <WrapperRadio>
      <Radio.Group onChange={onChange} defaultValue="item_base">
        <Radio.Button value="item_base">Item_Base</Radio.Button>
        <Radio.Button value="content_base">Content_Base</Radio.Button>
      </Radio.Group>
    </WrapperRadio>
  );
}

export default BaseRadio;
