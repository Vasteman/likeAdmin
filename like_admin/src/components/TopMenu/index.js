import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MenuItems = [
  { title: 'Домой', path: '/start' },
  { title: 'Типы лайков', path: '/likeAdmin/typesOfLikes' },
  { title: 'Релизы', path: '/likeAdmin/releases' },
  { title: 'Фичи', path: '/likeAdmin/features' },
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
  position: relative;

  :visited {
    border-bottom: none;
  }

  &.active {
    color: #fff;
    border-bottom: 2px solid #3fcbff;
  }

  :after,
  :before {
    color: #fff;
    transition: all 0.5s;
  }

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0%;
    content: '.';
    color: transparent;
    background: #3fcbff;
    height: 2px;
  }
  :hover {
    color: #fff;
  }
  :hover:after {
    width: 100%;
  }
`;

export default TopMenu;
