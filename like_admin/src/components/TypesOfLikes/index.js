import React from 'react';
import styled from 'styled-components';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './typesOfLikesTable';
import TypesOfLikesFilters from './TypesOfLikesFilters';

const TypesOfLikes = () => {
  return (
    <>
      <TopMenu />
      <Wrapper>
        <TypesOfLikesFilters />
        <TypesOfLikesTable />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 0px 30px;
  // border: 1px solid red;
`;

export default TypesOfLikes;
