import React, { Component, Fragment } from 'react'
import { Button } from 'antd'
import TopMenu from '../TopMenu'

class TypesOfLikes extends Component {
  render() {
    return(
      <Fragment>
        <TopMenu />
      </Fragment>
    )
  }
}

export default TypesOfLikes
// по сути ты берешь TopMenu, оборачиваешь его в Fragment и выплевываешь наружу.
// Почему бы просто сразу не импортить TopMenu?
// Не вижу необходимости существования TypesOfLikes
