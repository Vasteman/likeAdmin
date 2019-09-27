import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Input, Button, Popconfirm, Icon, Form, Switch } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class TypesOfLikesAdminModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { emojiActive: false };

  componentDidMount() {
    const {
      selectedRow,
      typesOfLikesModalState: { action },
      form: { validateFields },
    } = this.props;
    validateFields();

    if (action === 'edit') {
      const { typeId, typeName: emojiName, emojiName: emojiId, status: emojiActive } = selectedRow;
      this.setState({
        typeId,
        emojiName,
        emojiId,
        emojiActive,
      });
    }
  }

  onOK = () => {
    const {
      createTypeOfLike,
      typesOfLikesModalState: { action },
    } = this.props;

    if (action === 'create' || action === 'edit') createTypeOfLike(this.state);
    this.onCancel();
  };

  onCancel = () => {
    const { toggleTypesOfLikesModal, typesOfLikesModalState } = this.props;
    const { action } = typesOfLikesModalState;
    toggleTypesOfLikesModal({ action });
  };

  hasErrors = fieldsError => {
    console.log('fieldsError', fieldsError);
    console.log('hasErrors', Object.keys(fieldsError).some(field => fieldsError[field]));

    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
      typesOfLikesModalState,
    } = this.props;

    const { action } = typesOfLikesModalState;
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
    this.setState({
      [fieldName]: value,
    });
  };

  render() {
    const { isTypesOfLikesModal, form, selectedRow } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { emojiName, emojiId, emojiActive } = this.state;

    const emojiNameError = isFieldTouched('emojiName') && getFieldError('emojiName');
    const emojiIdError = isFieldTouched('emojiId') && getFieldError('emojiId');
    const emojiActiveError = isFieldTouched('emojiActive') && getFieldError('emojiActive');
    console.log('selectedRow', selectedRow);
    console.log('state MODAL', this.state);
    return (
      <Wrapper
        title="Тип лайков"
        visible={isTypesOfLikesModal}
        onCancel={this.onCancel}
        width={750}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <FormItem validateStatus={emojiNameError ? 'error' : ''} help={emojiNameError || ''}>
            {getFieldDecorator('emojiName', {
              rules: [{ required: true, message: 'Название типа является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название типа </Label>
                <Input
                  value={emojiName}
                  onChange={elem => this.ChangeField('emojiName', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={emojiIdError ? 'error' : ''} help={emojiIdError || ''}>
            {getFieldDecorator('emojiId', {
              rules: [{ required: true, message: 'Название Emoji является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название Emoji</Label>
                <Input
                  value={emojiId}
                  onChange={elem => this.ChangeField('emojiId', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={emojiActiveError ? 'error' : ''} help={emojiActiveError || ''}>
            {getFieldDecorator('emojiActive', {
              rules: [{ required: false, message: 'Статус является обязательным!' }],
            })(
              <WrapperForStatus>
                <Label> Активно </Label>
                <StyledSwitch
                  checked={emojiActive}
                  // defaultChecked={false}
                  onChange={value => this.ChangeField('emojiActive', value)}
                />
              </WrapperForStatus>
            )}
          </FormItem>
        </Form>
      </Wrapper>
    );
  }
}

TypesOfLikesAdminModal.propTypes = {
  isTypesOfLikesModal: PropTypes.bool.isRequired,
  toggleTypesOfLikesModal: PropTypes.func.isRequired,
  createTypeOfLike: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikesModalState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedRow: PropTypes.object.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

const Wrapper = styled(Modal)`
  .ant-btn-primary {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-btn-sm {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-form-item .ant-switch {
    margin: 2px 0 4px 50px;
  }
`;

const WrapperForLineInput = styled.div`
  display: flex;
  height: 40px;
  .ant-input {
    // border: 1px solid green;
    width: 500px;
    margin-left: 50px;
  }

  .ant-select {
    margin-left: 50px;
  }
`;

const Label = styled.div`
  width: 150px;
  height: 40px;
`;

const WrapperForStatus = styled.div`
  display: flex;
  width: 300px;

  .ant-input {
    margin-left: 50px;
  }

  .ant-select {
  }
`;

const StyledSwitch = styled(Switch)``;

const StyledButtonPrimary = styled(Button)``;

// export default TypesOfLikesAdminModal;
export default Form.create()(TypesOfLikesAdminModal);
