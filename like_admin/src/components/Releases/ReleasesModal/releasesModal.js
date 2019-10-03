/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Input, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'DD.MM.YYYY';
class ReleasesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  componentDidMount() {
    const {
      selectedRow,
      releasesModalState: { action },
      form: { validateFields },
    } = this.props;
    validateFields();

    if (action === 'edit') {
      const { TfsReleaseId, TfsReleaseName, TfsReleaseDate } = selectedRow;
      // console.log('moment', moment(TfsReleaseDate).format('DD.MM.YYYY'));
      console.log('selectedRow', selectedRow);
      console.log('moment(TfsReleaseDate)', moment(TfsReleaseDate));
      this.setState({
        TfsReleaseId,
        TfsReleaseName,
        TfsReleaseDate: moment(TfsReleaseDate),
      });
    }
  }

  onOK = () => {
    const {
      createRelease,
      releasesModalState: { action },
    } = this.props;

    if (action === 'create' || action === 'edit') createRelease(this.state);
    this.onCancel();
  };

  onCancel = () => {
    const { toggleReleaseModal, releasesModalState } = this.props;
    const { action } = releasesModalState;
    toggleReleaseModal({ action });
  };

  hasErrors = fieldsError => {
    console.log('fieldsError', fieldsError);
    console.log('hasErrors', Object.keys(fieldsError).some(field => fieldsError[field]));

    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
      releasesModalState,
    } = this.props;

    const { action } = releasesModalState;
    const disabledButtonPrimary = action === 'create' ? this.hasErrors(getFieldsError()) : false;

    return [
      <Popconfirm
        key={1}
        title="Изменения не будут сохранены! Закрыть форму без сохранения изменений?"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={this.onCancel}
        onCancel={() => null}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="danger" icon="close">
          Закрыть
        </Button>
      </Popconfirm>,
      <StyledButtonPrimary
        type="primary"
        icon="poweroff"
        disabled={disabledButtonPrimary}
        onClick={this.onOK}
      >
        Сохранить
      </StyledButtonPrimary>,
    ];
  };

  ChangeField = (fieldName, value) => {
    console.log('value date', value);
    // if (fieldName === 'TfsReleaseDate') value = moment(value).format('');
    this.setState({
      [fieldName]: value,
    });
  };

  render() {
    const { isReleasesModal, form } = this.props;
    console.log('isReleasesModal', isReleasesModal);

    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { TfsReleaseName, TfsReleaseDate } = this.state;
    console.log('STATE', this.state);

    const tfsReleaseNameError = isFieldTouched('TfsReleaseName') && getFieldError('TfsReleaseName');
    const tfsReleaseDateError = isFieldTouched('TfsReleaseDate') && getFieldError('TfsReleaseDate');

    return (
      <Wrapper
        title="Добавление релиза"
        visible={isReleasesModal}
        onCancel={this.onCancel}
        width={800}
        footer={this.renderFooterButtons()}
      >
        <StyledForm>
          <FormItem
            validateStatus={tfsReleaseNameError ? 'error' : ''}
            help={tfsReleaseNameError || ''}
          >
            {getFieldDecorator('TfsReleaseName', {
              rules: [{ required: true, message: 'Имя релиза является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название релиза </Label>
                <Input
                  value={TfsReleaseName}
                  onChange={elem => this.ChangeField('TfsReleaseName', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem
            validateStatus={tfsReleaseDateError ? 'error' : ''}
            help={tfsReleaseDateError || ''}
          >
            {getFieldDecorator('tfsReleaseDateError', {
              rules: [{ required: false, message: 'Выберите дату!' }],
            })(
              <WrapperForDate>
                <Label> Дата релиза </Label>
                <DatePicker
                  allowClear={false}
                  format={dateFormat}
                  value={TfsReleaseDate}
                  showToday={false}
                  // defaultValue={moment()}
                  onChange={dateString => this.ChangeField('TfsReleaseDate', dateString)}
                />
              </WrapperForDate>
            )}
          </FormItem>
        </StyledForm>
      </Wrapper>
    );
  }
}

ReleasesModal.propTypes = {
  isReleasesModal: PropTypes.bool.isRequired,
  toggleReleaseModal: PropTypes.func.isRequired,
  createRelease: PropTypes.func.isRequired,
  releasesModalState: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
};

const StyledForm = styled(Form)``;
const Wrapper = styled(Modal)`
  .ant-btn-primary {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-btn-sm {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-modal-title {
    font-family: T2_DisplaySerif_Bold_Short;
  }
  .ant-calendar-picker-input.ant-input {
    font-family: PT_Sans-Web-Regular;
  }
`;

const WrapperForLineInput = styled.div`
  display: flex;
  height: 35px;
  justify-content: space-between;

  .ant-input {
    margin-left: 50px;
  }

  .ant-select {
    margin-left: 50px;
  }
`;

const WrapperForDate = styled.div`
  display: flex;
  .ant-calendar-picker-input {
    margin-left: 15px;
  }
`;

const Label = styled.div`
  width: 150px;
  border: 1px solid re
  height: 30px;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
`;

export default Form.create()(ReleasesModal);
