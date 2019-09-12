import React, { Component } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './TypesOfLikesTable';
import TypesOfLikesFilters from './TypesOfLikesFilters';

class TypesOfLikesPanel extends Component {
  componentDidMount() {
    // const { fetchTypesOfLikes } = this.props;
    // fetchTypesOfLikes({});
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);
    return (
      <>
        <TopMenu />
        <Wrapper>
          <TypesOfLikesFilters />
          <TypesOfLikesTable />
        </Wrapper>
      </>
    );
  }
}

TypesOfLikesPanel.propTypes = {
  // fetchTypesOfLikes: PropTypes.func.isRequired,
};
const Wrapper = styled.div`
  margin: 0px 30px;
  // border: 1px solid red;
`;

export default TypesOfLikesPanel;
