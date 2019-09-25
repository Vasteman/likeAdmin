import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Input, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const FormItem = Form.Item;

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
      const { releaseId, releaseName, releaseDate } = selectedRow;

      this.setState({
        releaseId,
        releaseName,
        releaseDate,
      });
    }
  }

  onOK = () => {
    const {
      createFeature,
      releasesModalState: { action },
    } = this.props;

    if (action === 'create' || action === 'edit') createFeature(this.state);
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
    // const {
    //   form: { setFieldsValue },
    // } = this.props;

    // console.log('fieldName', fieldName);
    // console.log('value', value);
    // if (fieldName === 'emojiActive') {
    //   setFieldsValue({ fieldName: value });
    // }
    // fieldName === 'releaseDate' ? value: value.utc().format() : value; DODELAT!!!
    this.setState({
      [fieldName]: value,
    });
  };

  render() {
    const { isReleasesModal, form } = this.props;
    console.log('isReleasesModal', isReleasesModal);

    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { releaseId, releaseName, releaseDate } = this.state;
    console.log('STATE', this.state);

    const releaseIdError = isFieldTouched('releaseId') && getFieldError('releaseId');
    const releaseNameError = isFieldTouched('releaseName') && getFieldError('releaseName');
    const releaseDateError = isFieldTouched('releaseDate') && getFieldError('releaseDate');

    return (
      <Wrapper
        title="Добавление релиза"
        visible={isReleasesModal}
        onCancel={this.onCancel}
        width={800}
        footer={this.renderFooterButtons()}
      >
        <StyledForm>
          <FormItem validateStatus={releaseIdError ? 'error' : ''} help={releaseIdError || ''}>
            {getFieldDecorator('releaseId', {
              rules: [{ required: true, message: 'ID релиза является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> ID </Label>
                <Input
                  value={releaseId}
                  onChange={elem => this.ChangeField('releaseId', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={releaseNameError ? 'error' : ''} help={releaseNameError || ''}>
            {getFieldDecorator('releaseName', {
              rules: [{ required: false, message: 'Имя релиза является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название релиза </Label>
                <Input
                  value={releaseName}
                  onChange={elem => this.ChangeField('releaseName', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={releaseDateError ? 'error' : ''} help={releaseDateError || ''}>
            {getFieldDecorator('releaseDateError', {
              rules: [{ required: true, message: 'Выберите дату!' }],
            })(
              <WrapperForDate>
                <Label> Дата релиза(TFS) </Label>
                <DatePicker
                  allowClear={false}
                  // format={datesFormatsArray}
                  value={releaseDate}
                  showToday={false}
                  defaultValue={moment()}
                  onChange={dateString => this.ChangeField('releaseDate', dateString)}
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
  createFeature: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  releasesModalState: PropTypes.object.isRequired,
  // getFieldDecorator: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
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
