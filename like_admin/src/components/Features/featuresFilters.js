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
    isFilterHidden: false,
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
  changeVisibilityFilter = isFilterHidden => {
    console.log('1111');
    return !isFilterHidden;
  };

  render() {
    // const { features } = this.props;
    const { isFilterHidden } = this.state;
    console.log('isFilterHidden state', isFilterHidden);
    return (
      <>
        <Wrapper>
          <HeaderForFilters>
            <TitleForFilters> Фильтры </TitleForFilters>
            <StyledIconFilter
              type="filter"
              onClick={() => {
                this.changeVisibilityFilter(isFilterHidden);
              }}
            />
          </HeaderForFilters>

          <WrapperForAllFilters hidden={isFilterHidden}>
            <WrapperForRangePicker>
              <RangePicker isMonthOnly={3} value={{ from: date.from, to: date.to }} />
              <StyledButton type="primary"> Поиск </StyledButton>
              <StyledButton type="default"> Очистить </StyledButton>
            </WrapperForRangePicker>

            <WrapperForInputFilter>
              <StyledTitle> Показать активные </StyledTitle>
              <Checkbox> </Checkbox>
              <StyledTitle> Название </StyledTitle>
              <Input />
              <StyledButton type="primary"> Поиск </StyledButton>
              <StyledButton type="default"> Очистить </StyledButton>
            </WrapperForInputFilter>
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
  justify-content: space-between;
  height: 70px;
  color: #000;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
  .anticon > * {
    color: #000;
  }

  .ant-checkbox-inner {
    margin-top: 15px;
  }
`;
const HeaderForFilters = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;
const StyledIconFilter = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
`;

const TitleForFilters = styled.div`
  width: 170px;
  height: 30px;
  font-size: 18px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  // text-align: center;
  margin-left: 30px;
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
  height: 40px;
  .ant-input {
    width: 150px;
    margin: 3px 0px 0px 10px;
  }
  .ant-btn-primary {
    height: 32px;
    background-color: #3fcbff;
    border-color: #3fcbff;
    margin: 3px 0px 0px 15px;
  }
  .ant-btn-default {
    height: 32px;
    margin: 3px 0px 0px 15px;
  }

  .ant-checkbox-input {
    border: 1px solid red;
    margin: 3px 0px 0px 10px;
  }
`;

const WrapperForRangePicker = styled.div`
  // border: 1px solid red;
  width: 750px;
  margin-left: 15px;
  display: flex;
`;

const StyledButton = styled(Button)`
  border: 1px solid black;
  height: 30px;
`;

const WrapperForInputFilter = styled.div`
  // border: 1px solid red;
  width: 800px;
  display: flex;
  height: 40px;
  margin-left: 200px;
`;

export default FeaturesFilters;
