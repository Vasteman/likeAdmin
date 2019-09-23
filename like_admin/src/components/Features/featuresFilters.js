import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button, Checkbox, Icon } from 'antd';
// import PropTypes from 'prop-types';
// import RangePicker from 'components/RangePicker';

class FeaturesFilters extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    // const { typesOfLikes } = this.props;
    // this.createTable(typesOfLikes);
  }

  // componentWillReceiveProps(nextProps) {
  //   // eslint-disable-next-line no-shadow
  //   // const { typesOfLikes } = nextProps;
  //   // console.log('nextProps', nextProps);
  //   // if (typesOfLikes) this.createTable(typesOfLikes);
  // }

  render() {
    // const { features } = this.props;
    console.log('state table', this.state);
    console.log('state props', this.props);
    return (
      <>
        <Wrapper>
          <HeaderForFilters>
            <TitleForFilters> Фильтры </TitleForFilters>
            <StyledIcon type="filter"> </StyledIcon>
          </HeaderForFilters>

          <WrapperForSearch>
            <WrapperForRangePicker>
              {/* <RangePicker /> */}
              RangePicker
            </WrapperForRangePicker>
            <StyledTitle> Название </StyledTitle>
            <Input size="small" />
            <Button type="primary"> Поиск </Button>

            <StyledTitle> Показать активные </StyledTitle>
            <Checkbox> </Checkbox>
          </WrapperForSearch>
        </Wrapper>
      </>
    );
  }
}

FeaturesFilters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // features: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  // background-color: white;
  font-family: PT_Sans-Web-Regular;
  // border: 2px solid red;
  height: 80px;
  color: #000;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .anticon > * {
    color: #000;
  }
`;
const HeaderForFilters = styled.div`
  //border: 1px solid black;
  height: 40px;
  border-bottom: 1px solid black;
  // display: flex;
`;
const StyledIcon = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
`;

const TitleForFilters = styled.div`
  width: 200px;
  height: 30px;
  font-size: 20px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 10px;
  //border: 1px solid red;
`;
const StyledTitle = styled.div`
  border: 1px solid red;
  width: 180px;
  text-align: center;
  font-size: 16px;
  height: 24px;
  margin-left: 40px;
`;

const WrapperForSearch = styled.div`
  display: flex;
  border: 1px solid black;
  width: auto;

  .ant-input {
    width: 100px;
    margin: 0px 10px;
  }
  .ant-btn-primary {
    height: 24px;
    background-color: #3fcbff;
    border-color: #3fcbff;
  }

  .ant-checkbox-input {
    border: 1px solid red;
    margih-left: 30px;
  }
`;

const WrapperForRangePicker = styled.div`
  border: 1px solid red;
  width: 300px;
`;

export default FeaturesFilters;
