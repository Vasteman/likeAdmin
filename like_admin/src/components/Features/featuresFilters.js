/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Checkbox, Form, Button } from 'antd';
import PropTypes from 'prop-types';
import RangePicker from 'components/RangePicker';
import moment from 'moment';

class FeaturesFilters extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    datePeriodStart: moment().subtract(1, 'month'),
    datePeriodFinish: moment(),
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
  changeDate = params => {
    this.setState({
      ...params,
    });
  };

  onChangeCheckbox = event => {
    console.log('checked', event.target.checked);
    // const { fetchFeatures } = this.props;
    // fetchFeatures() передать здесь параметр для отображения по статусу
  };

  ChangeField = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  onSearchFeaturesByName = () => {
    console.log('STATE onSearchFeaturesByName', this.state);
    const { featureName } = this.state;
    const { fetchFeatures } = this.props;
    fetchFeatures({ featureName });
  };

  onClearInputForFeatureName = () => {
    const {
      form: { resetFields },
    } = this.props;

    this.setState({
      featureName: '',
    });
    resetFields();
  };

  handleClear = () => {
    console.log('1111');
    this.setState({
      datePeriodStart: moment().subtract(1, 'month'),
      datePeriodFinish: moment(),
    });
  };

  onSearchFeaturesByPeriod = () => {
    const { datePeriodStart, datePeriodFinish } = this.state;
    const { fetchFeatures } = this.props;
    fetchFeatures({
      datePeriodStart: moment(datePeriodStart).format('DD.MM.YYYY HH:mm'),
      datePeriodFinish: moment(datePeriodFinish).format('DD.MM.YYYY HH:mm'),
    });
  };

  render() {
    const { datePeriodStart, datePeriodFinish } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    console.log('this. state', this.state);
    return (
      <StyledForm>
        <WrapperForInputFilter>
          <StyledTitle> Название </StyledTitle>
          <Form.Item>
            {getFieldDecorator('featureName', {})(
              <Input
                placeholder="Название"
                onChange={elem => this.ChangeField('featureName', elem.target.value)}
              />
            )}
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" onClick={this.onSearchFeaturesByName}>
              Найти
            </StyledButton>
            <StyledButton type="default" onClick={this.onClearInputForFeatureName}>
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
            handleClear={this.handleClear}
          />
          <StyledButton type="primary" onClick={this.onSearchFeaturesByPeriod}>
            Найти
          </StyledButton>
          <StyledButton type="default" onClick={this.handleClear}>
            Очистить
          </StyledButton>
          <StyledTitle> Показать активные </StyledTitle>
          <Checkbox onChange={this.onChangeCheckbox} />
        </WrapperForPeriodFilters>
      </StyledForm>
    );
  }
}

FeaturesFilters.propTypes = {
  // features: PropTypes.array.isRequired,
  resetFields: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  fetchFeatures: PropTypes.func.isRequired,
};

const StyledForm = styled(Form)`
  font-family: T2_DisplaySerif_Regular;
  justify-content: space-between;
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
      width: 750px;
    }
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

const StyledTitle = styled.div`
  width: 150px;
  font-size: 16px;
  height: 24px;
  margin: 8px 0px 0px 10px;
`;

const StyledTitlePeriod = styled.div`
  font-size: 16px;
  margin: 0px 135px 0px 10px;
  padding-top: 5px;
  @media (max-width: 1280px) {
    margin: 0px 145px 0px 10px;
  }
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

export default Form.create()(FeaturesFilters);
