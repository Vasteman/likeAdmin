import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import RangePicker from 'components/RangePicker';
import moment from 'moment';

class ReleasesFilters extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    datePeriodStart: moment().subtract(1, 'month'),
    datePeriodFinish: moment(),
  };

  changeDate = params => {
    this.setState({
      ...params,
    });
  };

  handleClear = () => {
    this.setState({
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
    });
  };

  ChangeField = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  onClearInputForReleaseName = () => {
    const {
      form: { resetFields },
      fetchReleases,
    } = this.props;

    this.setState({
      releaseName: '',
    });
    resetFields();
    fetchReleases({});
  };

  handleClear = () => {
    this.setState({
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
    });
  };

  onSearchReleasesByPeriod = () => {
    const { datePeriodStart, datePeriodFinish } = this.state;
    const { fetchReleases } = this.props;
    fetchReleases({
      dateFrom: moment(datePeriodStart).format('YYYY-MM-DD'),
      dateTo: moment(datePeriodFinish).format('YYYY-MM-DD'),
    });
  };

  onSearchReleasesByName = () => {
    const { releaseName } = this.state;
    const { fetchReleases } = this.props;
    if (releaseName) fetchReleases({ releaseName });
    this.setState({ releaseName: '' });
  };

  render() {
    const { datePeriodStart, datePeriodFinish } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <StyledForm>
        <WrapperForInputFilter>
          <StyledTitle> Название </StyledTitle>
          <Form.Item>
            {getFieldDecorator('releaseName', {})(
              <Input
                placeholder="Название"
                onChange={elem => this.ChangeField('releaseName', elem.target.value)}
              />
            )}
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" onClick={this.onSearchReleasesByName}>
              Найти
            </StyledButton>
            <StyledButton type="default" onClick={this.onClearInputForReleaseName}>
              Очистить
            </StyledButton>
          </Form.Item>
        </WrapperForInputFilter>
        <WrapperForPeriodFilters>
          <StyledTitlePeriod> Период </StyledTitlePeriod>
          <RangePicker
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) =>
              this.changeDate({ datePeriodStart: from, datePeriodFinish: to })
            }
          />
          <StyledButton type="primary" onClick={this.onSearchReleasesByPeriod}>
            Найти
          </StyledButton>
          <StyledButton type="default" onClick={this.handleClear}>
            Очистить
          </StyledButton>
        </WrapperForPeriodFilters>
      </StyledForm>
    );
  }
}

ReleasesFilters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  resetFields: PropTypes.func.isRequired,
  fetchReleases: PropTypes.func.isRequired,
};

const StyledForm = styled(Form)`
  font-family: T2_DisplaySerif_Regular;
  height: 90px;
  color: #000;
  border-bottom: 1px solid #8e97a0;
  .anticon > * {
    color: #000;
  }

  .ant-checkbox {
    margin-top: 15px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #44caff;
    border-color: #44caff;
  }
  .ant-input {
    font-family: PT_Sans-Web-Regular;
    margin: 3px 0px 0px 10px;
    width: 1400px;
    @media (max-width: 1280px) {
      width: 700px;
    }
    @media (max-width: 1368px) {
      width: 750px;
    }
  }
  .ant-btn-primary {
    height: 32px;
    background-color: #3fcbff;
    border-color: #3fcbff;
    margin: 3px 0px 0px 25px;
  }
  .ant-btn-default {
    height: 32px;
    margin: 3px 10px 0px 15px;
  }
  .ant-calendar-picker-input.ant-input {
    font-family: PT_Sans-Web-Regular;
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
  margin: 0px 40px 0px 10px;
  padding-top: 5px;
  width: 150px;
  @media (max-width: 1280px) {
    margin: 0px 50px 0px 10px;
  }
  // @media (max-width: 1368px) {
  //   margin: 0px 140px 0px 10px;
  // }
`;

const WrapperForPeriodFilters = styled.div`
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

export default Form.create()(ReleasesFilters);
