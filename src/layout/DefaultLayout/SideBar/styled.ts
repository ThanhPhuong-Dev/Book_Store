import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  .btn-collapse {
    position: absolute;
    top: 24px;
    right: -16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #f6f6f6;
    box-shadow: 0px 0px 10px 0px #0a007a1a;
    z-index: 10;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s linear;
  }

  &:hover .btn-collapse {
    opacity: 1;
    visibility: visible;
  }

  .ant-menu-item-group-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    color: #34306a;
    padding: 12px 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .ant-menu .ant-menu-item {
    height: 48px;
    line-height: 48px;
    color: #6c727f;
    font-size: 14px;
    font-weight: 700;
    border-radius: 0;
    height: 70px;
  }

  .ant-menu .ant-menu-item-selected {
    background-color: #f4f4f6;
    color: #34306a;
    font-weight: bold;

    &::after {
      left: 0;
      right: unset;
      border-right: none;
      border-left: 4px solid #27ae61;
    }
  }

  .ant-menu .ant-menu-item {
    &:focus,
    &:hover {
      background-color: #f4f4f6;
      /* color: #34306a;
      font-weight: bold; */

      /* &::after {
        left: 0;
        right: unset;
        border-right: none;
        border-left: 4px solid #ff8800;
      } */
    }
  }

  .ant-menu-vertical .ant-menu-item:not(:last-child),
  .ant-menu-vertical-left .ant-menu-item:not(:last-child),
  .ant-menu-vertical-right .ant-menu-item:not(:last-child),
  .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 0px;
  }
  .ant-menu-inline .ant-menu-item {
    margin-top: 0px;
  }
`;
