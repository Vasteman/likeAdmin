/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Modal,
  Button,
  Popconfirm,
  Icon,
  Form,
  Input,
  Select,
  Switch,
  List,
  Typography,
} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
let arrayForReleases = []; // массив релизов, в которых есть эта фича
class FeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { IsLikeActive: false };

  componentDidMount() {
    const {
      selectedRow,
      featuresModalState: { action },
      form: { validateFields },
      fetchReleases,
      // releases,
    } = this.props;
    validateFields();
    fetchReleases({});

    if (action === 'edit') {
      const { FeatureName, IsLikeActive, FeatureId, GetReleasesBinding } = selectedRow;
      this.createListReleases(GetReleasesBinding);

      this.setState({
        FeatureId,
        FeatureName,
        IsLikeActive,
        TfsReleaseId: null,
        // TfsReleaseName: null,
      });
    }
  }

  createListReleases = GetReleasesBinding => {
    arrayForReleases = [];
    if (GetReleasesBinding) {
      GetReleasesBinding.map(release => {
        arrayForReleases.push(release.TfsReleaseName);
        return release.TfsReleaseName;
      });
    }
    return arrayForReleases;
  };

  onOK = () => {
    const {
      createFeature,
      featuresModalState: { action },
    } = this.props;
    const { FeatureName, IsLikeActive, TfsReleaseId, FeatureId } = this.state;
    let featureData = [];
    if (action === 'edit') featureData = [{ FeatureId, FeatureName, IsLikeActive }];
    else featureData = [{ FeatureName, IsLikeActive }];

    createFeature({ TfsReleaseId, featureData });
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
  };

  render() {
    const {
      isFeaturesModal,
      form,
      releases,
      featuresModalState: { action },
    } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const { FeatureName, IsLikeActive, TfsReleaseId } = this.state;

    const featureNameError = isFieldTouched('FeatureName') && getFieldError('FeatureName');
    const isLikeActiveError = isFieldTouched('IsLikeActive') && getFieldError('IsLikeActive');
    const releaseNameError = isFieldTouched('ReleaseName') && getFieldError('ReleaseName');
    return (
      <Wrapper
        title={action === 'edit' ? 'Редактирование фичи' : 'Добавление фичи'}
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

          <WrapperForSelectAndList>
            <WrapperForSwitchAndNameRelease>
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
            </WrapperForSwitchAndNameRelease>

            {action === 'edit' && (
              <StyledList
                header="Релизы, содержащие фичу"
                // bordered
                size="small"
                dataSource={arrayForReleases}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            )}
          </WrapperForSelectAndList>
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
  getFieldDecorator: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  releases: PropTypes.array.isRequired,
  fetchReleases: PropTypes.func.isRequired,
  GetReleasesBinding: PropTypes.array.isRequired,
};

const StyledForm = styled(Form)`
  width: 700px;
  .ant-form-item .ant-switch {
    margin-top: 10px;
    margin-right: 100px;
  }

  .ant-list-split .ant-list-header {
    border-bottom: 1px solid #e8e8e8;
    font-family: T2_DisplaySerif_Bold_Short;
    color: black;
    font-size: 16px;
  }
  .ant-list-bordered .ant-list-item {
    text-align: center;
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
`;

const WrapperForSelectAndList = styled.div`
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

const StyledList = styled(List)``;

const WrapperForSwitchAndNameRelease = styled.div`
  width: 320px;
`;
export default Form.create()(FeaturesModal);
