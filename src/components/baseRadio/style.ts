import styled from 'styled-components';

export const WrapperRadio = styled.div`
  .ant-radio-button-wrapper {
    margin-left: 10px;
    border-radius: 10px;
    border: 1px solid #27ae61;

    &:hover {
      color: #27ae61;
      background-color: rgba(39, 174, 97, 0.2);
    }
  }
  :where(.css-dev-only-do-not-override-mzwlov).ant-radio-button-wrapper:not(:first-child)::before {
    width: 0;
  }
  .ant-radio-button-wrapper-checked {
    border-color: #27ae61 !important;
    background-color: rgba(39, 174, 97, 0.2);
    color: #27ae61;
  }
`;
