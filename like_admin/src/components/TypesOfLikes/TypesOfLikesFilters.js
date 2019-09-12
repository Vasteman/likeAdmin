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
  background-color: #fff;
  margin: 25px 0px 0px 0px;
  height: 40px;
  border-bottom: 2px solid grey;
  box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
`;

const Title = styled.div`
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
  font-size: 25px;
  margin: 5px 5px;
`;

const WrapperForIcon = styled.div`
  float: right;
  margin-right: 0;
  margin-left: auto;
`;

export default TypesOfLikesFilters;
