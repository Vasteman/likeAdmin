/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Input, Select, Switch } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class FeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { IsLikeActive: false };

  componentDidMount() {
    const {
      selectedRow,
      featuresModalState: { action },
      form: { validateFields },
      fetchReleases,
    } = this.props;
    validateFields();

    fetchReleases({});

    if (action === 'edit') {
      console.log('SELECTED ROW', selectedRow);
      const { FeatureName, IsLikeActive, TfsReleaseId } = selectedRow;

      this.setState({
        FeatureName,
        IsLikeActive,
        TfsReleaseId,
      });
    }
  }

  onOK = () => {
    const {
      createFeature,
      featuresModalState: { action },
    } = this.props;
    console.log('State OK!', this.state);
    const { FeatureName, IsLikeActive, TfsReleaseId } = this.state;
    const featureData = [{ FeatureName, IsLikeActive }];
    if (action === 'create' || action === 'edit') createFeature({ TfsReleaseId, featureData });
    this.onCancel();
  };

  onCancel = () => {
    const { toggleFeaturesModal, featuresModalState } = this.props;
    const { action } = featuresModalState;
    toggleFeaturesModal({ action });
  };

  hasErrors = fieldsError => {
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
    this.setState({
      [fieldName]: value,
    });
    console.log('State modal!', this.state);
  };

  render() {
    const { isFeaturesModal, form, releases } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { FeatureName, IsLikeActive, TfsReleaseId } = this.state;

    const featureNameError = isFieldTouched('FeatureName') && getFieldError('FeatureName');
    const isLikeActiveError = isFieldTouched('IsLikeActive') && getFieldError('IsLikeActive');
    const releaseNameError = isFieldTouched('ReleaseName') && getFieldError('ReleaseName');

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
            {getFieldDecorator('FeatureName', {
              rules: [{ required: true, message: 'Имя фичи является обязательным!' }],
            })(
              <WrapperForFeatureInput>
                <Label> Название фичи </Label>
                <Input
                  value={FeatureName}
                  onChange={elem => this.ChangeField('FeatureName', elem.target.value)}
                />
              </WrapperForFeatureInput>
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
                <WrapperForReleaseName>
                  <Label> Название релиза</Label>
                  <StyledSelect
                    value={TfsReleaseId}
                    placeholder="Выберите релиз"
                    onChange={value => this.ChangeField('TfsReleaseId', value)}
                  >
                    {releases &&
                      releases.map(release => (
                        <Select.Option value={release.TfsReleaseId} key={release.TfsReleaseId}>
                          {release.TfsReleaseName}
                        </Select.Option>
                      ))}
                  </StyledSelect>
                </WrapperForReleaseName>
              )}
            </FormItem>

            <FormItem
              validateStatus={isLikeActiveError ? 'error' : ''}
              help={isLikeActiveError || ''}
            >
              {getFieldDecorator('IsLikeActive', {
                rules: [{ required: false, message: 'Статус является обязательным!' }],
              })(
                <WrapperForStatus>
                  <Label> Активно </Label>
                  <Switch
                    checked={IsLikeActive}
                    onChange={value => this.ChangeField('IsLikeActive', value)}
                  />
                </WrapperForStatus>
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
  fetchReleases: PropTypes.func.isRequired,
};

const StyledForm = styled(Form)`
  width: 700px;
  height: 150px;
  .ant-form-item .ant-switch {
    margin-top: 10px;
  }
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
  .ant-modal-title {
    font-family: T2_DisplaySerif_Bold_Short;
  }
  .ant-switch-checked {
    background-color: #3fcbff;
  }
`;

const WrapperForFeatureInput = styled.div`
  display: flex;
  justify-content: space-between;
`;
const WrapperForReleaseName = styled.div`
  display: flex;
  width: 300px;

  .ant-select {
    width: 150px;
  }
`;

const WrapperForStatus = styled.div`
  display: flex;
  width: 300px;
  margin-left: 50px;
`;

const WrapperForSelectLine = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.div`
  width: 180px;
  height: 30px;
  margin-right: 10px;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selection {
    width: 160px;
  }
`;

export default Form.create()(FeaturesModal);
