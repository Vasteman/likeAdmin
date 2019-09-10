import React from 'react';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './typesOfLikesTable';
import TypesOfLikesFilters from './TypesOfLikesFilters';

const TypesOfLikes = () => {
  return (
    <>
      <TopMenu />
      <TypesOfLikesFilters />
      <TypesOfLikesTable />
    </>
  );
};

export default TypesOfLikes;
