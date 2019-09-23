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
      isMonthOnly,
      value: { from, to },
    } = this.props;

    if (!from || !to) return 'any';

    if (from.isSame(to, 'day')) return 'day';

    if (from.isSame(to.clone().subtract(7, 'days'), 'day')) return 'week';

    if (from.isSame(to.clone().subtract(1, 'month'), 'day')) return 'month';
    if (
      isMonthOnly &&
      from.isSame(
        to
          .clone()
          .add(1, 'day')
          .subtract(1, 'month'),
        'day'
      )
    )
      return 'month';
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
      isMonthOnly,
    } = this.props;

    if (isMonthOnly) {
      if (step === 'previos') {
        onChange({ to: moment(from).subtract(1, 'day'), from: moment(from).subtract(1, 'month') });
      } else {
        const newFrom = moment(from).add(1, 'month');
        const newTo = moment(newFrom)
          .add(1, 'month')
          .subtract(1, 'day');
        if (moment().isAfter(newTo)) {
          onChange({ to: newTo, from: newFrom });
        } else {
          onChange({ to: moment(), from: newFrom });
        }
      }
    } else {
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
    }
  };

  render() {
    const {
      value: { from, to },
      isMonthOnly,
    } = this.props;
    const isSelectedAny = this.selectedRange === 'any' && !isMonthOnly;
    const disabledPrevChange = isSelectedAny || (isMonthOnly && moment().diff(from, 'month') === 5);
    const disabledNextChange = isSelectedAny || to.isSame(moment(), 'day');

    return (
      <Wrapper>
        <Select
          style={{ width: '130px' }}
          value={this.selectedRange}
          onChange={this.handleRangeChange}
          disabled={isMonthOnly}
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
            disabled={isMonthOnly}
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
            disabled={isMonthOnly}
            disabledDate={this.checkToDateDisabled}
            value={to}
            onChange={this.handleToChange}
            format={datesFormatsArray}
            showToday={false}
            onBlur={() => this.blurHandle('to')}
          />
        </Label>
        <StyleButtonGroup>
          <Button
            disabled={disabledPrevChange}
            onClick={() => this.handleArrowChangePeriod('previos')}
          >
            <Icon type="left" />
          </Button>
          <Button
            disabled={disabledNextChange}
            onClick={() => this.handleArrowChangePeriod('next')}
          >
            <Icon type="right" />
          </Button>
        </StyleButtonGroup>
      </Wrapper>
    );
  }
}

RangePicker.propTypes = {
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.shape({
    from: PropTypes.instanceOf(moment).isRequired,
    to: PropTypes.instanceOf(moment).isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  limitMonth: PropTypes.number.isRequired,
  isMonthOnly: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const StyledPicker = styled(DatePicker)`
  margin-left: 10px;
  width: 140px;
`;

const StyleButtonGroup = styled(ButtonGroup)`
  margin-left: 10px;
  display: inherit;
  & button {
    width: 30px;
    padding: 0;
    padding-top: 2px;
  }
`;
