import React from 'react';
import styled from 'styled-components';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './typesOfLikesTable';
import TypesOfLikesFilters from './TypesOfLikesFilters';

const TypesOfLikes = () => {
  return (
    <>
      <Wrapper>
        <TopMenu />
        <TypesOfLikesFilters />
        <TypesOfLikesTable />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  // background-color: #f8f8f8;
  // border: 1px solid red;
`;

export default TypesOfLikes;
