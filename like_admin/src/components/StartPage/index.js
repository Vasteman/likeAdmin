import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'antd'

const StartMenu = [
  { title: 'Типы лайков', path: '/likeAdmin/typesOfLikes', type: 'heart'}, // space before "}"
  { title: 'Релизы', path: '/likeAdmin/releases', type: 'file-done'}, // space before "}"
  { title: 'Features', path: '/likeAdmin/features', type: 'experiment' }
  ] //минус tab

class StartPage extends Component {
// empty space
  render() {
   return (
    <Fragment> // необходимость Fragment..? 
      <CardWrapper>
        {StartMenu.map(card => {
          return(
            <StyledLink to={card.path}> // key
              <CardOfStartMenu >
                <StyledIconCard type={card.type}></StyledIconCard>
                <CardName>{card.title}</CardName>
              </CardOfStartMenu >
            </StyledLink>
        )
      })
     }
      </CardWrapper>
    </Fragment>
   )
  }
}

const CardWrapper = styled.div`
   display: flex;
   margin: 100px auto;
   // border: 1px solid red;
   max-width: 1200px;
   max-height: 300px;
   // margin: auto;
   // position: absolute;
`
const StyledIconCard = styled(Icon)`
   font-size: 30px;
   color: #033e92;
   // border: 1px solid red;
   position: absolute;
   left: 10px;
   top: 10px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
`

const CardOfStartMenu = styled.div`

  box-shadow: 10px 10px 15px #CCC;
  width: 300px;
  height: 100px;
  border-radius: 3px; // double border-radius
  padding: 2em;
  margin: 1em;
  overflow: hidden;
  position: relative;
  flex: auto;
  transition: all .3s ease-in-out;
  box-shadow: 2px 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background: linear-gradient(-45deg, #033e92 50%, #fff 50%);
  border-radius: 20px; // double border-radius
  text-decoration: none;

  :hover{
  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.7);
  box-shadow: 0 0 5px rgba(0,0,0,0.7);
  transform: translate3d(10px, -20px, -20px);
 }
}
`
const CardName = styled.div`
  text-decoration: none;
  font-size: 20px;
  font-family: T2_TextSans_Regular;
  color: #000;
  text-overflow: ellipsis;
  margin: -20px 0px 0px 20px; //пока не смотрел, как это выглядит, но -20?
  width: 150px;
  -webkit-box-shadow: 0 0 0 rgba(0,0,0, 0.5);
  box-shadow: 0 0 0 rgba(0,0,0,0.8);

`

export default StartPage
