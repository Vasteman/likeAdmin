import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TopMenu from '../TopMenu';
import FeaturesTable from './featuresTable';
// import FeaturesFilters from './featuresFilters';

class FeaturesPanel extends Component {
  componentDidMount() {
    const { fetchFeatures } = this.props;
    fetchFeatures({});
  }

  onCreateFeature = () => {
    // const { toggleTypesOfLikesModal } = this.props;
    // toggleTypesOfLikesModal({ action: 'create' });
  };

  onEditFeature = () => {
    // const { toggleTypesOfLikesModal } = this.props;
    // console.log('edit');
    // toggleTypesOfLikesModal({ action: 'edit' });
  };

  onDeleteFeature = () => {
    console.log('delete');
  };

  render() {
    const { features } = this.props;
    console.log('PANEL', this.props);
    return (
      <>
        <TopMenu />
        <Wrapper>
          {/* <FeaturesFilters /> */}
          <HeaderForTable>
            <Title> Фичи </Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateFeature} />
              <StyledIcon type="edit" onClick={this.onEditFeature} />
              <StyledIcon type="delete" onClick={this.onDeleteFeature} />
            </WrapperForIcon>
          </HeaderForTable>
          <FeaturesTable features={features} />
          {/* <TypesOfLikesTable typesOfLikes={typesOfLikes} />
          {isTypesOfLikesModal && <TypesOfLikesAdminModal />} */}
        </Wrapper>
      </>
    );
  }
}

FeaturesPanel.propTypes = {
  fetchFeatures: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  features: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  // border: 3px solid green;
  background-color: #fff;
  margin: 25px 30px 0px 30px;
  // height: 100px;
  // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
`;

const Title = styled.div`
  width: 200px;
  height: 30px;
  font-size: 20px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 5px;
  padding-right: 40px;
`;

const HeaderForTable = styled.div`
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
  border-bottom: 1px solid black;
  display: flex;
  height: 40px;
  // border: 1px solid black;
  margin-top: 30px;
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
  .anticon > * {
    line-height: 1;
    color: #000;
  }
`;

export default FeaturesPanel;
