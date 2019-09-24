import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Input, Select, Button, Popconfirm, Icon, Form } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const STATUS_TYPE_OF_LIKE__OPTIONS = [
  {
    value: true,
    label: 'Вкл',
  },
  {
    value: false,
    label: 'Выкл',
  },
];

class TypesOfLikesAdminModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

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
    // const {
    //   form: { setFieldsValue },
    // } = this.props;

    // console.log('fieldName', fieldName);
    // console.log('value', value);
    // if (fieldName === 'emojiActive') {
    //   setFieldsValue({ fieldName: value });
    // }
    this.setState({
      [fieldName]: value,
    });
  };

  render() {
    const { isTypesOfLikesModal, form } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { typeId, emojiName, emojiId, emojiActive } = this.state;

    const typeIdError = isFieldTouched('typeId') && getFieldError('typeId');
    const emojiNameError = isFieldTouched('emojiName') && getFieldError('emojiName');
    const emojiIdError = isFieldTouched('emojiId') && getFieldError('emojiId');
    const emojiActiveError = isFieldTouched('emojiActive') && getFieldError('emojiActive');

    return (
      <Wrapper
        title="Тип лайков"
        visible={isTypesOfLikesModal}
        onOk={this.onOK}
        onCancel={this.onCancel}
        width={750}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <FormItem validateStatus={typeIdError ? 'error' : ''} help={typeIdError || ''}>
            {getFieldDecorator('typeId', {
              rules: [{ required: true, message: 'ID является обязательным!' }],
            })(
              <WrapperForLineInput>
                <Label> ID </Label>
                <Input
                  value={typeId}
                  onChange={elem => this.ChangeField('typeId', elem.target.value)}
                />
              </WrapperForLineInput>
            )}
          </FormItem>

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
              rules: [{ required: true, message: 'Статус является обязательным!' }],
              initialValue: STATUS_TYPE_OF_LIKE__OPTIONS[0].value,
            })(
              <WrapperForLineInput>
                <Label> Статус </Label>
                <StyledSelect
                  value={emojiActive}
                  placeholder="Выберите статус"
                  onChange={value => this.ChangeField('emojiActive', value)}
                >
                  {STATUS_TYPE_OF_LIKE__OPTIONS.map(option => (
                    <Select.Option value={option.value} key={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </StyledSelect>
              </WrapperForLineInput>
            )}
          </FormItem>
        </Form>

        {/* <WrapperForLineInput>
          <Label> Статус </Label>
          <StyledSelect
            value={emojiActive}
            // defaultValue={STATUS_TYPE_OF_LIKE__OPTIONS[0].value}
            onChange={value => this.ChangeField('emojiActive', value)}
          >
            {STATUS_TYPE_OF_LIKE__OPTIONS.map(option => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </StyledSelect>
        </WrapperForLineInput> */}
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

const StyledSelect = styled(Select)`
  // border: 1px solid green;
  width: 100px;
  .ant-select-selection {
    width: 170px;
    margin-left: 35px;
  }
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
`;

// export default TypesOfLikesAdminModal;
export default Form.create()(TypesOfLikesAdminModal);
