import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MenuItems = [
  { title: 'Домой', path: '/start' },
  { title: 'Типы лайков', path: '/likeAdmin/typesOfLikes' },
  { title: 'Релизы', path: '/likeAdmin/releases' },
  { title: 'Features', path: '/likeAdmin/features' },
];

const TopMenu = () => {
  return (
    <>
      <MenuWrapper>
        {MenuItems.map(item => {
          return (
            <StyledLink to={item.path} activeClassName="active">
              {item.title}
            </StyledLink>
          );
        })}
      </MenuWrapper>
    </>
  );
};

const MenuWrapper = styled.div`
  margin: 0px 30px;
  padding: 0;
  // width: 100%;
  height: 60px;
  display: flex;
  background: rgba(25, 25, 25);
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-family: T2_DisplaySerif_Regular;
  font-size: 16px;
  text-align: center;
  color: #fff;

  display: block;
  max-height: 60px;
  width: 150px;
  margin: 15px auto;

  &.active {
    border-bottom: 3px solid #3fcbff;
    // line-height: 2px;
  }

  :hover {
    border-bottom: 3px solid #3fcbff;
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
`;

export default TopMenu;
