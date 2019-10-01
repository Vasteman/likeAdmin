/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Select, DatePicker, Icon, Button } from 'antd';

const ButtonGroup = Button.Group;

const datesFormatsArray = [
  'DD.MM.YYYY',
  'YYYY',
  'MMYYYY',
  'DDMMYYYY',
  'MM.YYYY',
  'YYYY-MM-DD',
  'YYYY-MM',
  'DD-MM-YYYY',
  'MM-YYYY',
  'YYYY/MM/DD',
  'YYYY/MM',
  'DD/MM/YYYY',
  'MM/YYYY',
];

const RANGE_OPTIONS = [
  { value: 'any', label: 'Произвольный', disabled: true },
  { value: 'day', label: 'За день', disabled: false },
  { value: 'week', label: 'За неделю', disabled: false },
  { value: 'month', label: 'За месяц', disabled: false },
];

export default class RangePicker extends PureComponent {
  get selectedRange() {
    const {
      value: { from, to },
    } = this.props;

    if (!from || !to) return 'any';

    if (from.isSame(to, 'day')) return 'day';

    if (from.isSame(to.clone().subtract(7, 'days'), 'day')) return 'week';

    if (from.isSame(to.clone().subtract(1, 'month'), 'day')) return 'month';

    return 'any';
  }

  handleRangeChange = value => {
    const { onChange } = this.props;
    const currentDate = moment();

    switch (value) {
      case 'day':
        onChange({ from: moment(), to: currentDate });
        break;
      case 'week':
        onChange({ from: moment().subtract(7, 'days'), to: currentDate });
        break;
      case 'month':
        onChange({ from: moment().subtract(1, 'month'), to: currentDate });
        break;
      default:
        break;
    }
  };

  handleFromChange = from => {
    const {
      value: { to },
      onChange,
    } = this.props;
    if (from) {
      onChange({ to, from });
    }
  };

  handleToChange = to => {
    const {
      value: { from },
      onChange,
    } = this.props;

    if (to) {
      onChange({ to, from });
    }
  };

  checkFromDateDisabled = date => {
    const {
      value: { to },
    } = this.props;
    date.isAfter(to, 'day');
  };

  checkToDateDisabled = date => {
    const {
      value: { from },
    } = this.props;
    // eslint-disable-next-line no-unused-expressions
    date.isBefore(from, 'day') || date.isAfter(moment(), 'day');
  };

  blurHandle = edge => {
    const {
      value: { from, to },
      onChange,
      limitMonth,
    } = this.props;
    if (limitMonth && moment.duration(to.diff(from)).asMonths() > limitMonth) {
      if (edge === 'from') {
        onChange({ to: moment(from).add(limitMonth, 'months'), from });
      } else {
        onChange({ from: moment(to).subtract(limitMonth, 'months'), to });
      }
    }
  };

  handleArrowChangePeriod = step => {
    const {
      value: { from, to },
      onChange,
    } = this.props;

    const period = this.selectedRange;
    const difference = period === 'week' ? '7' : '1';
    const dimension = period === 'month' ? 'month' : 'day';
    if (step === 'previos') {
      onChange({
        to: moment(to).subtract(difference, dimension),
        from: moment(from).subtract(difference, dimension),
      });
    } else {
      const newTo = moment(to).add(difference, dimension);
      if (moment().isAfter(newTo)) {
        // проверка на доступность даты
        onChange({ to: newTo, from: moment(from).add(difference, dimension) });
      } else {
        onChange({ to: moment(), from: moment().subtract(difference, dimension) });
      }
    }
  };

  onSearchByPeriod = (from, to) => {
    console.log('from', from);
    console.log('to', to);
  };

  render() {
    const {
      value: { from, to },
      handleClear,
    } = this.props;
    const disabledNextChange = to.isSame(moment(), 'day');

    console.log('from render', from);
    console.log('to render', to);
    return (
      <Wrapper>
        <Select
          style={{ width: '130px', margin: '12px 0 0 0' }}
          value={this.selectedRange}
          onChange={this.handleRangeChange}
        >
          {RANGE_OPTIONS.map(option => (
            <Select.Option value={option.value} disabled={option.disabled} key={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Label>
          с
          <StyledPicker
            allowClear={false}
            disabledDate={this.checkFromDateDisabled}
            value={from}
            onChange={this.handleFromChange}
            format={datesFormatsArray}
            showToday={false}
            onBlur={() => this.blurHandle('from')}
          />
        </Label>
        <Label>
          по
          <StyledPicker
            allowClear={false}
            disabledDate={this.checkToDateDisabled}
            value={to}
            onChange={this.handleToChange}
            format={datesFormatsArray}
            showToday={false}
            onBlur={() => this.blurHandle('to')}
          />
        </Label>
        <StyleButtonGroup>
          <Button onClick={() => this.handleArrowChangePeriod('previos')}>
            <Icon type="left" />
          </Button>
          <Button
            disabled={disabledNextChange}
            onClick={() => this.handleArrowChangePeriod('next')}
          >
            <Icon type="right" />
          </Button>
        </StyleButtonGroup>
        <StyledButton type="primary" onClick={() => this.onSearchByPeriod(from, to)}>
          Найти
        </StyledButton>
        <StyledButton type="default" onClick={handleClear}>
          Очистить
        </StyledButton>
      </Wrapper>
    );
  }
}

RangePicker.propTypes = {
  value: PropTypes.shape({
    from: PropTypes.instanceOf(moment).isRequired,
    to: PropTypes.instanceOf(moment).isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  limitMonth: PropTypes.number.isRequired,
  handleClear: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 5px;

  .ant-calendar-picker-input.ant-input {
    height: 32px;
    margin: 0px 0px 0px 10px;
    width: 120px;
    padding: 0px 20px 0px 0px;
    text-align: center;
  }

  .ant-btn-group .ant-btn {
    height: 32px;
  }

  .ant-btn-group {
    position: relative;
    display: flex;
  }

  .ant-select-disabled .ant-select-selection {
    height: 32px;
  }

  .ant-select-selection-selected-value {
    height: 32px;
    width: 120px;
    padding: 0px 20px 20px 5px;
    text-align: center;
  }

  .ant-select-selection--single {
    height: 32px;
    margin-bottom: 8px;
  }

  .ant-calendar-picker-icon {
    padding-right: 10px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 5px 0px 0px 0px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 150px;
`;

const StyledPicker = styled(DatePicker)`
  // margin: 0px 0px 0px 10px;
  width: 135px;
`;

const StyleButtonGroup = styled(ButtonGroup)`
  margin: -3px 10px 0px 10px;
  height: 25px;

  & button {
    width: 30px;
    padding: 0;
    padding-top: 2px;
  }
`;

const StyledButton = styled(Button)`
  height: 32px;
`;
