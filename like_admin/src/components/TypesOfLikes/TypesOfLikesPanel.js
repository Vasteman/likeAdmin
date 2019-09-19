import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './TypesOfLikesTable';
import TypesOfLikesAdminModal from './TypesOfLikesModal';

class TypesOfLikesPanel extends Component {
  componentDidMount() {
    const { fetchTypesOfLikes } = this.props;
    fetchTypesOfLikes();
  }

  onCreateType = () => {
    const { toggleTypesOfLikesModal } = this.props;
    toggleTypesOfLikesModal({ action: 'create' });
  };

  onEditType = () => {
    const { toggleTypesOfLikesModal, selectedRow } = this.props;
    console.log('edit');
    toggleTypesOfLikesModal({
      action: 'edit',
      typeId: selectedRow.typeId,
      typename: selectedRow.typeName,
      status: selectedRow.status,
      author: selectedRow.author,
    });
  };

  onDeleteType = () => {
    const { deleteTypeOfLike, selectedRow } = this.props;
    console.log('delete');
    console.log('selectedRow', selectedRow);

    deleteTypeOfLike({ typeId: selectedRow.typeId });
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    console.log(' onSelectRow record', this.record);
    selectRow({ selectedRow: record });
  };

  render() {
    const { typesOfLikes, isTypesOfLikesModal } = this.props;
    console.log('PROOOOPS', this.props);
    return (
      <>
        <TopMenu />
        <Wrapper>
          <Header>
            <Title> Типы лайков</Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateType} />
              <StyledIcon type="edit" onClick={this.onEditType} />
              <StyledIcon type="delete" onClick={this.onDeleteType} />
            </WrapperForIcon>
          </Header>
          <TypesOfLikesTable typesOfLikes={typesOfLikes} onSelectRow={this.onSelectRow} />
          {isTypesOfLikesModal && <TypesOfLikesAdminModal />}
        </Wrapper>
      </>
    );
  }
}

TypesOfLikesPanel.propTypes = {
  fetchTypesOfLikes: PropTypes.func.isRequired,
  deleteTypeOfLike: PropTypes.func.isRequired,
  toggleTypesOfLikesModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikes: PropTypes.array.isRequired,
  isTypesOfLikesModal: PropTypes.bool.isRequired,
  selectRow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedRow: PropTypes.object.isRequired,
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

const Header = styled.div`
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
