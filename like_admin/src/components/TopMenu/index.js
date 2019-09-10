import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuItems = [
  { title: 'Домой', path: '/start' },
  { title: 'Типы лайков', path: '/likeAdmin/typesOfLikes' },
  { title: 'Релизы', path: '/likeAdmin/releases' },
  { title: 'Features', path: '/likeAdmin/features' },
];

const TopMenu = () => {
  console.log('1111');
  return (
    <>
      <MenuWrapper>
        {MenuItems.map(item => {
          return (
            <StyledLink to={item.path}>
              <MenuItemName>{item.title}</MenuItemName>
            </StyledLink>
          );
        })}
      </MenuWrapper>
    </>
  );
};

const MenuWrapper = styled.div`
  background-color: #033e92;
  width: 100%;
  height: 60px;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-family: T2_TextSans_Regular;
  display: block;
  border-right: 1px solid #fff;
  padding: 15px 10px 0 10px;
  border-right: 1px solid #fff;
  height: 60px;
  width: 100px;
  text-align: center;

  :hover {
  }
`;

const MenuItemName = styled.div`
  color: #fff;
`;

export default TopMenu;
