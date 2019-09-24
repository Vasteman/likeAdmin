import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button, Checkbox } from 'antd';
// import PropTypes from 'prop-types';
import RangePicker from 'components/RangePicker';
import moment from 'moment';

const date = {
  from: moment(),
  to: moment().add(1, 'month'),
};

class FeaturesFilters extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

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
    return (
      <>
        <Wrapper>
          <WrapperForAllFilters>
            <WrapperForInputFilter>
              <StyledTitle> Название </StyledTitle>
              <Input placeholder="Название" />
              <StyledButton type="primary"> Найти </StyledButton>
              <StyledButton type="default"> Очистить </StyledButton>
            </WrapperForInputFilter>

            <WrapperForRangePicker>
              <StyledTitlePeriod> Период </StyledTitlePeriod>
              <RangePicker isMonthOnly={12} value={{ from: date.from, to: date.to }} />
              <StyledButton type="primary"> Найти </StyledButton>
              <StyledButton type="default"> Очистить </StyledButton>
              <StyledTitle> Показать активные </StyledTitle>
              <Checkbox> </Checkbox>
            </WrapperForRangePicker>
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
  font-family: T2_DisplaySerif_Regular;
  height: 90px;
  color: #000;
  border-bottom: 1px solid black;
  .anticon > * {
    color: #000;
  }

  .ant-checkbox-inner {
    margin-top: 15px;
  }
`;

const StyledTitle = styled.div`
  width: 150px;
  font-size: 16px;
  height: 24px;
  margin: 8px 0px 0px 10px;
`;

const StyledTitlePeriod = styled.div`
  font-size: 16px;
  margin: 0px 70px 0px 10px;
  //border: 1px solid red;
  padding-top: 5px;
`;

const WrapperForAllFilters = styled.div`
  .ant-input {
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
    margin: 3px 10px 0px 15px;
  }
`;

const WrapperForRangePicker = styled.div`
  display: flex;
  margin: 3px 0px 0px 0px;
`;

const StyledButton = styled(Button)`
  height: 32px;
`;

const WrapperForInputFilter = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

export default FeaturesFilters;
