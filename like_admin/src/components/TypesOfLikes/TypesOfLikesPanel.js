import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './TypesOfLikesTable';

class TypesOfLikesPanel extends Component {
  componentDidMount() {
    const { fetchTypesOfLikes } = this.props;
    console.log('props', this.props); // dont exist methods and props
    fetchTypesOfLikes({});
  }

  onCreateType = () => {
    const { toggleTypesOfLikesModal } = this.props;
    toggleTypesOfLikesModal({ action: 'create' });
  };

  onEditType = () => {
    const { toggleTypesOfLikesModal } = this.props;
    console.log('edit');
    toggleTypesOfLikesModal({ action: 'edit' });
  };

  onDeleteType = () => {
    console.log('delete');
  };

  render() {
    return (
      <>
        <TopMenu />
        <Wrapper>
          <HeaderForTable>
            <Title> Типы лайков</Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateType} />
              <StyledIcon type="edit" onClick={this.onEditType} />
              <StyledIcon type="delete" onClick={this.onDeleteType} />
            </WrapperForIcon>
          </HeaderForTable>
          <TypesOfLikesTable />
        </Wrapper>
      </>
    );
  }
}

TypesOfLikesPanel.propTypes = {
  fetchTypesOfLikes: PropTypes.func.isRequired,
  toggleTypesOfLikesModal: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  background-color: #fff;
  margin: 25px 30px 0px 30px;
  height: 40px;
  border-bottom: 2px solid grey;
  box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
`;

const Title = styled.div`
  width: 200px;
  height: 30px;
  font-size: 20px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 5px;
`;

const HeaderForTable = styled.div`
  display: flex;
  height: 40px;
`;

const StyledIcon = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
`;

const WrapperForIcon = styled.div`
  float: right;
  margin-right: 0;
  margin-left: auto;
`;

export default TypesOfLikesPanel;
