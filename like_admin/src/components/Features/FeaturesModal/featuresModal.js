/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
// import moment from 'moment';

const FormItem = Form.Item;

const STATUS_FEATURES_OPTIONS = [
  {
    value: true,
    label: 'Вкл',
  },
  {
    value: false,
    label: 'Выкл',
  },
];

class FeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  componentDidMount() {
    const {
      selectedRow,
      featuresModalState: { action },
      form: { validateFields },
    } = this.props;
    validateFields();

    if (action === 'edit') {
      console.log('FETCH DONE');
      console.log('PROPS CDM ', this.props);
      const {
        featureId,
        featureName,
        featureStatus,
        tfsReleaseId,
        releaseName,
        tfsReleaseDate,
      } = selectedRow;

      this.setState({
        featureId,
        featureName,
        featureStatus,
        tfsReleaseId,
        releaseName,
        tfsReleaseDate,
      });
    }
  }

  onOK = () => {
    const {
      createFeature,
      featuresModalState: { action },
    } = this.props;
    console.log('State OK!', this.state);

    if (action === 'create' || action === 'edit') createFeature(this.state);
    this.onCancel();
  };

  onCancel = () => {
    const { toggleFeaturesModal, featuresModalState } = this.props;
    const { action } = featuresModalState;
    toggleFeaturesModal({ action });
  };

  hasErrors = fieldsError => {
    console.log('fieldsError', fieldsError);
    console.log('hasErrors', Object.keys(fieldsError).some(field => fieldsError[field]));

    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
      featuresModalState,
    } = this.props;

    const { action } = featuresModalState;
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
    // fieldName === 'tfsReleaseDate' ? value: value.utc().format() : value; DODELAT!!!
    this.setState({
      [fieldName]: value,
    });
    console.log('State modal!', this.state);
  };

  render() {
    const { isFeaturesModal, form, releases } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { featureName, featureStatus, releaseName } = this.state;
    console.log('releases', releases);
    console.log('PROOOPS', this.props);

    const featureNameError = isFieldTouched('featureName') && getFieldError('featureName');
    const featureStatusError = isFieldTouched('featureStatus') && getFieldError('featureStatus');
    const releaseNameError = isFieldTouched('releaseName') && getFieldError('releaseName');

    return (
      <Wrapper
        title="Добавление фичи"
        visible={isFeaturesModal}
        onCancel={this.onCancel}
        width={800}
        footer={this.renderFooterButtons()}
      >
        <StyledForm>
          <FormItem validateStatus={featureNameError ? 'error' : ''} help={featureNameError || ''}>
            {getFieldDecorator('featureName', {
              rules: [{ required: true, message: 'Имя фичи является обязательным!' }],
            })(
              <WrapperForNameFeature>
                <Label> Название фичи </Label>
                <Input
                  value={featureName}
                  onChange={elem => this.ChangeField('featureName', elem.target.value)}
                />
              </WrapperForNameFeature>
            )}
          </FormItem>

          <WrapperForSelectLine>
            <FormItem
              validateStatus={releaseNameError ? 'error' : ''}
              help={releaseNameError || ''}
            >
              {getFieldDecorator('releaseNameError', {
                rules: [{ required: false, message: 'Имя релиза является обязательным!' }],
              })(
                <WrapperForLineInput>
                  <Label> Название релиза</Label>
                  <StyledSelect
                    value={releaseName}
                    placeholder="Релиз"
                    onChange={value => this.ChangeField('releaseName', value)}
                  >
                    {releases.map(release => (
                      <Select.Option value={release.TfsReleaseId} key={release.TfsReleaseId}>
                        {release.TfsReleaseName}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </WrapperForLineInput>
              )}
            </FormItem>

            <FormItem
              validateStatus={featureStatusError ? 'error' : ''}
              help={featureStatusError || ''}
            >
              {getFieldDecorator('featureStatus', {
                rules: [{ required: false, message: 'Статус является обязательным!' }],
              })(
                <WrapperForLineInput>
                  <Label> Статус </Label>
                  <StyledSelect
                    value={featureStatus}
                    placeholder="Статус"
                    onChange={value => this.ChangeField('featureStatus', value)}
                  >
                    {STATUS_FEATURES_OPTIONS.map(option => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </StyledSelect>
                </WrapperForLineInput>
              )}
            </FormItem>
          </WrapperForSelectLine>
        </StyledForm>
      </Wrapper>
    );
  }
}
FeaturesModal.propTypes = {
  isFeaturesModal: PropTypes.bool.isRequired,
  toggleFeaturesModal: PropTypes.func.isRequired,
  createFeature: PropTypes.func.isRequired,
  featuresModalState: PropTypes.object.isRequired,
  // getFieldDecorator: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  releases: PropTypes.array.isRequired,
};

const StyledForm = styled(Form)`
  width: 700px;
  height: 150px;
`;

const Wrapper = styled(Modal)`
  display: flex;
  .ant-btn-primary {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-btn-sm {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
`;

const WrapperForNameFeature = styled.div`
  display: flex;
  justify-content: space-between;
`;
const WrapperForLineInput = styled.div`
  display: flex;
  width: 300px;
  .ant-input {
    margin-left: 50px;
  }

  .ant-select {
    //margin-left: 35px;
  }
`;

const WrapperForSelectLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.div`
  width: 200px;
  height: 30px;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    // border: 1px solid black;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selection {
    width: 100px;
    margin-left: 50px;
  }
`;

export default Form.create()(FeaturesModal);
