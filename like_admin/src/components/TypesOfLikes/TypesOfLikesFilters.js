import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const TypesOfLikesFilters = () => {
  return (
    <>
      <Wrapper>
        <HeaderForTable>
          <Title> Типы лайков </Title>
          <WrapperForIcon>
            <StyledIcon type="plus" />
            <StyledIcon type="edit" />
            <StyledIcon type="delete" />
          </WrapperForIcon>
        </HeaderForTable>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  margin: 25px 30px 0px 30px;
  // border: 1px solid green;
  height: 40px;
  border-bottom: 2px solid black;
  box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
`;

const Title = styled.div`
  // border: 1px solid black;
  width: 200px;
  height: 30px;
  font-size: 20px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 5px;
`;

const HeaderForTable = styled.div`
  display: flex;
  height: 40px;
`;

const StyledIcon = styled(Icon)`
  width: 40px;
  // border: 1px solid red;
  font-size: 25px;
  margin: 5px 5px;
`;

const WrapperForIcon = styled.div`
  float: right;
  // border: 1px solid black;
  margin-right: 0;
  margin-left: auto;
`;

export default TypesOfLikesFilters;
