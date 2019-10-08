/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Input, Button, Popconfirm, Icon, Form, Switch } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class TypesOfLikesAdminModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { EmojiActive: false };

  componentDidMount() {
    const {
      selectedRow,
      typesOfLikesModalState: { action },
      form: { validateFields },
    } = this.props;
    validateFields();

    if (action === 'edit') {
      const { TypeId, EmojiName, EmojiId, EmojiActive } = selectedRow;
      this.setState({
        TypeId,
        EmojiName,
        EmojiId,
        EmojiActive,
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
    const {
      isTypesOfLikesModal,
      form,
      typesOfLikesModalState: { action },
    } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { EmojiName, EmojiId, EmojiActive } = this.state;
    const emojiNameError = isFieldTouched('EmojiName') && getFieldError('EmojiName');
    const emojiIdError = isFieldTouched('EmojiId') && getFieldError('EmojiId');
    const emojiActiveError = isFieldTouched('EmojiActive') && getFieldError('EmojiActive');

    return (
      <Wrapper
        title={action === 'create' ? 'Добавление типа лайка' : 'Редактирование типа лайка'}
        visible={isTypesOfLikesModal}
        onCancel={this.onCancel}
        width={750}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <FormItem validateStatus={emojiIdError ? 'error' : ''} help={emojiIdError || ''}>
            {getFieldDecorator('EmojiId', {
              rules: [{ required: true, message: 'Название типа является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название типа </Label>
                <Input
                  value={EmojiId}
                  onChange={elem => this.ChangeField('EmojiId', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={emojiNameError ? 'error' : ''} help={emojiNameError || ''}>
            {getFieldDecorator('EmojiName', {
              rules: [{ required: true, message: 'Название Emoji является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> Название Emoji </Label>
                <Input
                  value={EmojiName}
                  onChange={elem => this.ChangeField('EmojiName', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

          <FormItem validateStatus={emojiActiveError ? 'error' : ''} help={emojiActiveError || ''}>
            {getFieldDecorator('EmojiActive', {
              rules: [{ required: false, message: 'Статус является обязательным!' }],
            })(
              <WrapperForStatus>
                <Label> Активно </Label>
                <StyledSwitch
                  checked={EmojiActive}
                  // defaultChecked={false}
                  onChange={value => this.ChangeField('EmojiActive', value)}
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
  typesOfLikesModalState: PropTypes.object.isRequired,
  selectedRow: PropTypes.object.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
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
  .ant-modal-title {
    font-family: T2_DisplaySerif_Bold_Short;
  }
  .ant-switch-checked {
    background-color: #3fcbff;
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
