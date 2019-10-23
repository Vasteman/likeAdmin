import React, { Component, Fragment } from 'react'
import { Route,Redirect, Link} from 'react-router-dom' // spacing
import styled from 'styled-components'


const MenuItems = [ // menuItems - js-object, а не React.Component, пишется с маленькой
  { title: 'Домой', path: '/start'}, // space перед "}"
  { title: 'Типы лайков', path: '/likeAdmin/typesOfLikes'}, // space перед "}"
  { title: 'Релизы', path: '/likeAdmin/releases'}, // space перед "}"
  { title: 'Features', path: '/likeAdmin/features'} // space перед "}"
  ] // минус tab

class TopMenu extends Component{
  render() {
    console.log('1111'); // минус консоль
    return (
      <Fragment> // MenuWrapper - один компонент в return, в чем необходимость Fragment?
        <MenuWrapper>
          {MenuItems.map(item => { // menuItems - js-object, а не React.Component, пишется с маленькой
            return(
              <StyledLink to={item.path}> // по хорошему надо прописать key, и желательно не index
                <MenuItemName>{item.title}</MenuItemName>
               </StyledLink>
            )
          }) // что-то не то с переносами скобок
          }
        </MenuWrapper>
      </Fragment>
    )
  }
}

const MenuWrapper = styled.div`
  background-color: #033e92;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  display: flex;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-family: T2_TextSans_Regular;
  display: block;
  border-right: 1px solid #fff;
  padding: 15px 10px 0 10px;
  border-right: 1px solid #fff; // double border-right
  height: 60px;
  width: 100px;
  text-align: center;

  :hover{ // empty :hover

  }
`
const MenuItemName = styled.div`
  color: #fff;
`
export default TopMenu
