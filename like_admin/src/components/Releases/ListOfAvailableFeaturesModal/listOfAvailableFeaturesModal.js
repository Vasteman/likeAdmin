/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Modal,
  Button,
  Popconfirm,
  Icon,
  Form,
  Checkbox,
  Table,
  Input,
  Collapse,
  Spin,
} from 'antd';
import PropTypes from 'prop-types';

let gridData = [];
let arrayForSelectedRows = [];
let arrayForGettedFeatures = [];

let listFeaturesForDeleteFromRelease = [];
class ListOfAvailableFeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    const {
      form: { validateFields },
      fetchFeatures,
      record: { GetFeatureBinding },
    } = this.props;
    fetchFeatures({});
    validateFields();
    this.getFeaturesIncludedInRelease(GetFeatureBinding);
  }

  componentWillReceiveProps(nextProps) {
    const { features } = nextProps;
    if (features) this.createTable(features);
  }

  onOK = () => {
    const {
      createFeature,
      record: { TfsReleaseId },
      // fetchReleases,
    } = this.props;
    const featureData = [];

    arrayForSelectedRows.map(row => {
      return featureData.push({
        FeatureId: row.FeatureId,
        FeatureName: row.FeatureName,
        IsLikeActive: row.IsLikeActive,
      });
    });

    createFeature({ TfsReleaseId, featureData });
    arrayForSelectedRows = [];
    // fetchReleases({});
    this.onCancel();
  };

  onCancel = () => {
    const { toggleListOfAvailableFeaturesModal } = this.props;
    toggleListOfAvailableFeaturesModal({});
  };

  renderFooterButtons = () => {
    const disabledButtonPrimary = Object.keys(arrayForSelectedRows).length === 0;
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

  // table
  createDataSource = features => {
    return features.map(feature => {
      let item = {};
      item = {
        FeatureAuthor: feature.FeatureAuthor,
        FeatureDate: feature.FeatureDate,
        FeatureId: feature.FeatureId,
        FeatureName: feature.FeatureName,
        IsLikeActive: feature.IsLikeActive,
      };
      return item;
    });
  };

  getFeaturesIncludedInRelease = GetFeatureBinding => {
    arrayForGettedFeatures = [];
    if (GetFeatureBinding) {
      GetFeatureBinding.map(feature => {
        arrayForGettedFeatures.push({
          FeatureId: feature.FeatureId,
          IsLikeActive: feature.IsLikeActive,
          FeatureName: feature.FeatureName,
        });
        return feature.FeatureName;
      });
    }
    return arrayForGettedFeatures;
  };

  convertDataSourceIntoArray = () => {
    const { features } = this.props;
    gridData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < features.length; i++) {
      // массив с ключами для того, чтобы сравнивать с ним выбранные строки
      gridData.push({
        key: i,
        FeatureId: features[i].FeatureId,
        FeatureAuthor: features[i].FeatureAuthor,
        FeatureDate: features[i].FeatureDate,
        FeatureName: features[i].FeatureName,
        IsLikeActive: features[i].IsLikeActive,
      });
    }
    return gridData;
  };

  createTable = features => {
    this.dataSource = this.createDataSource(features);

    this.columns = [
      {
        title: 'Название',
        dataIndex: 'FeatureName',
        key: 'FeatureName',
        width: '80%',
      },
      {
        title: 'Активно',
        dataIndex: 'IsLikeActive',
        key: 'IsLikeActive',
        width: '15%',
        sorter: (first, second) => first.IsLikeActive - second.IsLikeActive,
        render: (text, record) => {
          return <Checkbox checked={record.IsLikeActive} />;
        },
      },
      // {
      //   title: 'Дата создания',
      //   dataIndex: 'FeatureDate',
      //   key: 'FeatureDate',
      //   width: '30%',
      //   render: value => {
      //     return value ? moment(value).format('DD.MM.YYYY') : '';
      //   },
      // },
    ];
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onSelectRowFromListFeatures = record => {
    const {
      record: { TfsReleaseId },
    } = this.props;

    listFeaturesForDeleteFromRelease.push({
      TfsReleaseId,
      FeatureId: record.FeatureId,
    });
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onSelectAllRowsFromListFeatures = (selected, selectedRows, changeRows) => {
    const {
      record: { TfsReleaseId },
    } = this.props;

    if (selected) {
      changeRows.map(row => {
        if (listFeaturesForDeleteFromRelease.indexOf(row.FeatureId) >= 0) {
          listFeaturesForDeleteFromRelease.splice(
            listFeaturesForDeleteFromRelease.indexOf(row.FeatureId),
            1
          );
        } else
          listFeaturesForDeleteFromRelease.push({
            TfsReleaseId,
            FeatureId: row.FeatureId,
          });
        return listFeaturesForDeleteFromRelease;
      });
    } else {
      listFeaturesForDeleteFromRelease.splice(0, listFeaturesForDeleteFromRelease.length);
    }
  };

  onSelectChange = selectedRowKeys => {
    arrayForSelectedRows = [];
    selectedRowKeys.map(index => {
      return arrayForSelectedRows.push(gridData[index]);
    });

    this.setState({ selectedRowKeys });
    return arrayForSelectedRows;
  };

  onSearchFeaturesByName = () => {
    const { FeatureName } = this.state;
    const { fetchFeatures } = this.props;
    if (FeatureName) fetchFeatures({ FeatureName });
    else fetchFeatures({});
  };

  onDeleteFeaturesFromRelease = () => {
    const { deleteFeaturesFromReleases, GetFeatureBinding } = this.props;

    if (listFeaturesForDeleteFromRelease.length !== 0) {
      deleteFeaturesFromReleases(listFeaturesForDeleteFromRelease);
      listFeaturesForDeleteFromRelease = [];
      // this.getFeaturesIncludedInRelease(GetFeatureBinding);
      console.log('GetFeatureBinding', GetFeatureBinding);
      console.log('arrayForGettedFeatures', arrayForGettedFeatures);
    }
  };

  render() {
    const { isListOfAvailableFeaturesModal, features, isLoadingFeaturesTable } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelectionForTableAvailableFeatures = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        this.onSelectRow(record, selected, selectedRows);
      },
      type: 'checkbox',
    };

    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        this.onSelectRowFromListFeatures(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.onSelectAllRowsFromListFeatures(selected, selectedRows, changeRows);
      },
      type: 'checkbox',
    };

    const dataSourceArray = arrayForGettedFeatures.concat(arrayForSelectedRows);
    console.log('arrayForGettedFeatures', arrayForGettedFeatures);
    console.log('dataSourceArray', dataSourceArray);

    return (
      <Wrapper
        title="Список доступных фич"
        visible={isListOfAvailableFeaturesModal}
        onCancel={this.onCancel}
        width={800}
        footer={this.renderFooterButtons()}
      >
        <StyledForm>
          <WrapperForAvailableFeatures>
            <WrapperForSearchLine>
              <LabelForName> Название </LabelForName>
              <Input
                placeholder="Название"
                allowClear
                onChange={elem => this.ChangeField('FeatureName', elem.target.value)}
              />
              <StyledButtonPrimary type="primary" onClick={this.onSearchFeaturesByName}>
                Найти
              </StyledButtonPrimary>
            </WrapperForSearchLine>

            <Collapse bordered={false}>
              <Collapse.Panel header="Показать доступные фичи">
                <StyledSpin
                  spinning={isLoadingFeaturesTable}
                  indicator={<Icon type="loading" spin />}
                >
                  {features && (
                    <StyledTable
                      rowSelection={rowSelectionForTableAvailableFeatures}
                      bordered
                      dataSource={this.convertDataSourceIntoArray()} // gridData
                      columns={this.columns}
                      // pagination={{ pageSize: 6 }}
                      scroll={{ y: 190 }}
                      size="small"
                    />
                  )}
                </StyledSpin>
              </Collapse.Panel>
            </Collapse>
          </WrapperForAvailableFeatures>
          <WrapperIncludedInReleaseFeatures>
            <Title>
              <Label>Список фич, включенных в релиз </Label>
              <Popconfirm
                key={1}
                title="Уверены в удалении?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                placement="bottomRight"
                onConfirm={this.onDeleteFeaturesFromRelease}
                onCancel={() => null}
                okText="Да"
                cancelText="Нет"
              >
                <StyledIcon type="delete" />
              </Popconfirm>
            </Title>
            <StyledTable
              rowSelection={rowSelection}
              bordered
              dataSource={dataSourceArray}
              columns={this.columns}
              scroll={{ y: 190 }}
              pagination={false}
              size="small"
              type={false}
            />
          </WrapperIncludedInReleaseFeatures>
        </StyledForm>
      </Wrapper>
    );
  }
}

ListOfAvailableFeaturesModal.propTypes = {
  isListOfAvailableFeaturesModal: PropTypes.bool.isRequired,
  toggleListOfAvailableFeaturesModal: PropTypes.func.isRequired,
  deleteFeaturesFromReleases: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  features: PropTypes.array.isRequired,
  fetchFeatures: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  createFeature: PropTypes.func.isRequired,
  TfsReleaseId: PropTypes.number.isRequired,
  isLoadingFeaturesTable: PropTypes.bool.isRequired,
  record: PropTypes.object.isRequired,
  // fetchReleases: PropTypes.func.isRequired,
  GetFeatureBinding: PropTypes.array.isRequired,
  // selectedRow: PropTypes.object.isRequired,
};

const StyledForm = styled(Form)``;
const Wrapper = styled(Modal)`
  font-family: PT_Sans-Web-Regular;
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
`;

const WrapperForSearchLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const WrapperForAvailableFeatures = styled.div``;

const WrapperIncludedInReleaseFeatures = styled.div`
  .ant-table-small
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-header
    > table
    > .ant-table-thead
    > tr
    > th {
    text-align: center;
    background-color: #ecf9ff;
    color: #8e97a0;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    color: #000;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-small
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > .ant-table-header
    > table
    > .ant-table-thead
    > tr
    > th {
    text-align: center;
    background-color: #ecf9ff;
    color: #8e97a0;
  }
  .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
    text-align: center;
    color: #000;
    background-color: #ecf9ff;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #44caff;
    border-color: #44caff;
  }

  .ant-table-small > .ant-table-content .ant-table-header {
    background-color: #ecf9ff;
  }
  .ant-table-thead > tr > th {
    text-align: center;
  }
  .ant-table-small
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > table
    > .ant-table-tbody
    > tr
    > td {
    text-align: center;
  }
`;

const Label = styled.div`
  width: 400px;
  height: 30px;
  font-size: 16px;
  color: #000;
  font-family: T2_DisplaySerif_Bold_Short;
`;

const LabelForName = styled.div`
  width: 150px;
  padding: 5px 0px;
`;
const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
  margin: 0px 20px;
`;

const StyledSpin = styled(Spin)`
  .anticon-spin {
    margin-left: 350px;
    color: #3fcbff;
  }
  .ant-spin-dot {
    position: relative;
    display: inline-block;
    font-size: 50px;
    width: 1em;
    height: 1em;
  }
`;

const StyledIcon = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
  color: black;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Form.create()(ListOfAvailableFeaturesModal);
