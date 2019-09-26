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
      fetchReleases,
    } = this.props;
    validateFields();

    if (action === 'edit') {
      fetchReleases({});
      console.log('FETCH DONE');
      const {
        featureId,
        featureName,
        featureStatus,
        tfsReleaseId,
        tfsReleaseName,
        tfsReleaseDate,
      } = selectedRow;

      this.setState({
        featureId,
        featureName,
        featureStatus,
        tfsReleaseId,
        tfsReleaseName,
        tfsReleaseDate,
      });
    }
  }

  onOK = () => {
    const {
      createFeature,
      featuresModalState: { action },
    } = this.props;

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
  };

  render() {
    const { isFeaturesModal, form, releases } = this.props;

    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { featureName, featureStatus } = this.state;
    console.log('releases', releases);
    console.log('PROOOPS', this.props);
    const featureNameError = isFieldTouched('featureName') && getFieldError('featureName');
    const featureStatusError = isFieldTouched('featureStatus') && getFieldError('featureStatus');
    const tfsReleaseNameError = isFieldTouched('tfsReleaseName') && getFieldError('tfsReleaseName');

    return (
      <Wrapper
        title="Добавление фичи"
        visible={isFeaturesModal}
        onCancel={this.onCancel}
        width={800}
        footer={this.renderFooterButtons()}
      >
        <StyledForm>
          <FeatureWrapper>
            <FormItem
              validateStatus={featureNameError ? 'error' : ''}
              help={featureNameError || ''}
            >
              {getFieldDecorator('featureName', {
                rules: [{ required: false, message: 'Имя фичи является обязательным!' }],
              })(
                <WrapperForLineInput>
                  <Label> Название фичи </Label>
                  <Input
                    value={featureName}
                    onChange={elem => this.ChangeField('featureName', elem.target.value)}
                  />
                </WrapperForLineInput>
              )}
            </FormItem>

            <FormItem
              validateStatus={featureStatusError ? 'error' : ''}
              help={featureStatusError || ''}
            >
              {getFieldDecorator('featureStatus', {
                rules: [{ required: false, message: 'Статус является обязательным!' }],
                // initialValue: STATUS_TYPE_OF_LIKE__OPTIONS[0].value,
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
          </FeatureWrapper>

          <ReleaseWrapper>
            <FormItem
              validateStatus={tfsReleaseNameError ? 'error' : ''}
              help={tfsReleaseNameError || ''}
            >
              {getFieldDecorator('tfsReleaseNameError', {
                rules: [{ required: true, message: 'Имя релиза является обязательным!' }],
              })(
                <WrapperForLineInput>
                  <Label> Название релиза</Label>
                  {releases.map(release => (
                    <Select.Option value={release.value} key={release.value}>
                      {release.label}
                    </Select.Option>
                  ))}
                </WrapperForLineInput>
              )}
            </FormItem>
          </ReleaseWrapper>
        </StyledForm>
      </Wrapper>
    );
  }
}
FeaturesModal.propTypes = {
  isFeaturesModal: PropTypes.bool.isRequired,
  toggleFeaturesModal: PropTypes.func.isRequired,
  createFeature: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  featuresModalState: PropTypes.object.isRequired,
  // getFieldDecorator: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedRow: PropTypes.object.isRequired,
  fetchReleases: PropTypes.func.isRequired,
  releases: PropTypes.array.isRequired,
};

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
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

const FeatureWrapper = styled.div`
  width: 350px;
`;

const ReleaseWrapper = styled.div`
  width: 350px;
  margin-left: 50px;
  .ant-calendar-picker-input.ant-input {
    width: 140px;
    margin-left: 50px;
    font-family: PT_Sans-Web-Regular;
  }
`;
const WrapperForLineInput = styled.div`
  display: flex;
  height: 35px;
  .ant-input {
    // border: 1px solid green;
    width: 140px;
    margin-left: 50px;
  }

  .ant-select {
    margin-left: 50px;
  }
`;

// const WrapperForDate = styled.div`
//   display: flex;
// `;

const Label = styled.div`
  width: 150px;
  height: 30px;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
`;

const StyledSelect = styled(Select)`
  // border: 1px solid green;
  width: 100px;
  .ant-select-selection {
    width: 140px;
    margin-left: 60px;
  }
`;

export default Form.create()(FeaturesModal);
