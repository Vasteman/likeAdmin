import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Input, Select, Button, Popconfirm, Icon } from 'antd';
import PropTypes from 'prop-types';

const REGIONS_SEARCH_OPTIONS = [
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
    } = this.props;

    if (action === 'edit') {
      // деструктуризирую и пихаю все в стейт, потом отправляю это все в запросе
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

  renderFooterButtons = () => {
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
      <StyledButtonPrimary type="primary" icon="poweroff" onClick={this.onOK}>
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
    const { isTypesOfLikesModal } = this.props;
    const { typeId, emojiName, emojiId, emojiActive } = this.state;
    return (
      <Wrapper
        title="Тип лайков"
        visible={isTypesOfLikesModal}
        onOk={this.onOK}
        onCancel={this.onCancel}
        width={750}
        footer={this.renderFooterButtons()}
      >
        <WrapperForLineInput>
          <Label> ID </Label>
          <Input
            value={typeId}
            onChange={elem => this.ChangeField('typeId', parseInt(elem.target.value, 10))}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Название типа </Label>
          <Input
            value={emojiName}
            onChange={elem => this.ChangeField('emojiName', elem.target.value)}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Название Emoji </Label>
          <Input
            value={emojiId}
            onChange={elem => this.ChangeField('emojiId', elem.target.value)}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Статус </Label>
          <StyledSelect
            value={emojiActive}
            // defaultValue={REGIONS_SEARCH_OPTIONS[0].value}
            onChange={value => this.ChangeField('emojiActive', value)}
          >
            {REGIONS_SEARCH_OPTIONS.map(option => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </StyledSelect>
        </WrapperForLineInput>

        {/* <WrapperForLineInput>
          <Label> Автор </Label>
          <Input
            id="author"
            // value={author}
            onChange={elem => this.ChangeField('author', elem.target.value)}
          />
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
  // border: 1px solid red;
  width: 150px;
  height: 50px;
`;

const StyledSelect = styled(Select)`
  // border: 1px solid green;
  width: 100px;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
`;

export default TypesOfLikesAdminModal;
