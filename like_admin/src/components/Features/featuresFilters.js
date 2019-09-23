import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button, Checkbox, Icon } from 'antd';
// import PropTypes from 'prop-types';
import RangePicker from 'components/RangePicker';
import moment from 'moment';

const date = {
  from: moment(),
  to: moment().add(7, 'days'),
};

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

    console.log('date', date);
    return (
      <>
        <Wrapper>
          <HeaderForFilters>
            <TitleForFilters> Фильтры </TitleForFilters>
            <StyledIconFilter type="filter" />
          </HeaderForFilters>

          <WrapperForAllFilters>
            <WrapperForRangePicker>
              <RangePicker isMonthOnly={3} value={{ from: date.from, to: date.to }} />
            </WrapperForRangePicker>
            <StyledTitle> Показать активные </StyledTitle>
            <Checkbox> </Checkbox>
            <StyledTitle> Название </StyledTitle>
            <Input size="small" />
            <StyledButton type="primary"> Поиск </StyledButton>
            <StyledButton type="danger"> Очистить </StyledButton>
          </WrapperForAllFilters>
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
  height: 70px;
  color: #000;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .anticon > * {
    color: #000;
  }

  .ant-checkbox-inner {
    margin-top: 15px;
  }
`;
const HeaderForFilters = styled.div`
  // border: 1px solid black;
  height: 30px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;
const StyledIconFilter = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
  // border: 1px solid red;
`;

const TitleForFilters = styled.div`
  width: 170px;
  height: 30px;
  font-size: 18px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  // text-align: center;
  margin-left: 30px;
  // border: 1px solid green;
`;
const StyledTitle = styled.div`
  //border: 1px solid red;
  width: 160px;
  text-align: center;
  font-size: 16px;
  height: 24px;
  margin: 8px 0px 0px 70px;
`;

const WrapperForAllFilters = styled.div`
  display: flex;
  // border: 1px solid black;
  height: 35px;
  .ant-input {
    width: 150px;
    margin: 8px 0px 0px 10px;
  }
  .ant-btn-primary {
    height: 25px;
    background-color: #3fcbff;
    border-color: #3fcbff;
    margin: 8px 0px 0px 15px;
  }
  .ant-btn-danger {
    height: 25px;
    margin: 8px 0px 0px 15px;
  }

  .ant-checkbox-input {
    border: 1px solid red;
    margin: 8px 0px 0px 10px;
  }
`;

const WrapperForRangePicker = styled.div`
  // border: 1px solid red;
  width: 575px;
  margin-left: 15px;
`;

const StyledButton = styled(Button)`
  border: 1px solid black;
  height: 30px;
`;

export default FeaturesFilters;
