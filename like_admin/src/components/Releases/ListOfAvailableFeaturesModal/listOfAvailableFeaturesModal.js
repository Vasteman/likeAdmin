/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Checkbox, Table, Input, Spin } from 'antd';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

let gridData = [];
let listFeaturesForDeleteFromRelease = [];

const findRecordByIndex = (array, index) => {
  if (array.length !== 0) {
    const record = array[index];
    return record;
  }
  return null;
};
class ListOfAvailableFeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
    dataSourceArray: [],
    arrayForSelectedRows: [],
  };

  componentDidMount() {
    const {
      form: { validateFields },
      fetchFeatures,
      features,
    } = this.props;
    fetchFeatures({});
    if (features) this.createColumnForTable();
    validateFields();
  }

  static getDerivedStateFromProps(props, state) {
    const { releases, rowIndex } = props;
    const { dataSourceArray, arrayForSelectedRows } = state;
    if (releases) {
      const releasesRow = findRecordByIndex(releases, rowIndex);
      if (!isEqual(releasesRow.GetFeatureBinding, dataSourceArray))
        return {
          dataSourceArray: dataSourceArray
            .concat(releasesRow.GetFeatureBinding)
            .concat(arrayForSelectedRows),
        };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { releases, rowIndex } = this.props;
    const { dataSourceArray, selectedRowKeys } = prevState;
    if (releases) {
      const releasesRow = findRecordByIndex(releases, rowIndex);
      if (releases !== prevProps.releases) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          dataSourceArray: dataSourceArray
            .splice(0, dataSourceArray)
            .concat(releasesRow.GetFeatureBinding),
          // .concat(arrayForSelectedRows),
          selectedRowKeys: selectedRowKeys.splice(0, selectedRowKeys),
        });
      }
    }
    return false;
  }

  onOK = () => {
    const { createFeature, releases, rowIndex } = this.props;
    const { arrayForSelectedRows, selectedRowKeys } = this.state;
    const releasesRow = findRecordByIndex(releases, rowIndex);
    const { TfsReleaseId } = releasesRow;
    const featureData = [];

    this.setState({
      arrayForSelectedRows: arrayForSelectedRows
        .map(row => {
          return featureData.push({
            FeatureId: row.FeatureId,
            FeatureName: row.FeatureName,
            IsLikeActive: row.IsLikeActive,
          });
        })
        .slice(0, arrayForSelectedRows),
      selectedRowKeys: selectedRowKeys.splice(0, selectedRowKeys),
    });
    createFeature({ TfsReleaseId, featureData });
  };

  onCancel = () => {
    const { toggleListOfAvailableFeaturesModal } = this.props;
    toggleListOfAvailableFeaturesModal({});
  };

  renderFooterButtons = () => {
    const { arrayForSelectedRows } = this.state;
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
        {/* <Button type="danger" icon="close">
          Закрыть
        </Button> */}
      </Popconfirm>,
      <StyledButtonPrimary
        type="primary"
        icon="poweroff"
        disabled={disabledButtonPrimary}
        onClick={this.onOK}
      >
        Привязать выбранные
      </StyledButtonPrimary>,
    ];
  };

  ChangeField = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };

  // for features table
  convertDataSourceIntoArray = () => {
    // массив с ключами для того, чтобы сравнивать с ним выбранные строки
    const { features } = this.props;
    gridData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < features.length; i++) {
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

  createColumnForTable = () => {
    this.columns = [
      {
        title: 'Название',
        dataIndex: 'FeatureName',
        key: 'FeatureName',
        width: '60%',
      },
      {
        title: 'Активно',
        dataIndex: 'IsLikeActive',
        key: 'IsLikeActive',
        width: '30%',
        sorter: (first, second) => first.IsLikeActive - second.IsLikeActive,
        render: (text, record) => {
          return <Checkbox checked={record.IsLikeActive} />;
        },
      },
    ];
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onSelectRowFromListFeatures = (record, selected, selectedRows) => {
    const { releases, rowIndex, selectRow } = this.props;
    const releasesRow = releases[rowIndex];
    const { TfsReleaseId } = releasesRow;
    listFeaturesForDeleteFromRelease = [];

    selectRow({ selectedRow: record });
    selectedRows.map(row => {
      return listFeaturesForDeleteFromRelease.push({
        TfsReleaseId,
        FeatureId: row.FeatureId,
      });
    });
  };

  onSelectAllRowsFromListFeatures = (selected, selectedRows) => {
    const { releases, rowIndex } = this.props;
    const releasesRow = releases[rowIndex];
    const { TfsReleaseId } = releasesRow;

    if (selected) {
      selectedRows.map(row => {
        return listFeaturesForDeleteFromRelease.push({
          TfsReleaseId,
          FeatureId: row.FeatureId,
        });
      });
    }
  };

  onSelectChange = selectedRowKeys => {
    const { arrayForSelectedRows } = this.state;
    const tempData = [];
    selectedRowKeys.map(index => {
      return tempData.push(gridData[index]);
    });
    this.setState({
      selectedRowKeys,
      arrayForSelectedRows: arrayForSelectedRows.splice(0, arrayForSelectedRows).concat(tempData),
    });
  };

  onSearchFeaturesByName = () => {
    const { FeatureName } = this.state;
    const { fetchFeatures } = this.props;
    if (FeatureName) fetchFeatures({ FeatureName });
    else fetchFeatures({});
  };

  onDeleteFeaturesFromRelease = () => {
    const { deleteFeaturesFromReleases } = this.props;
    const { selectedRowKeys } = this.state;

    if (listFeaturesForDeleteFromRelease.length !== 0) {
      deleteFeaturesFromReleases(listFeaturesForDeleteFromRelease);
      listFeaturesForDeleteFromRelease = [];
    }
    this.setState({
      selectedRowKeys: selectedRowKeys.splice(0, selectedRowKeys),
    });
  };

  render() {
    const { isListOfAvailableFeaturesModal, features, isLoadingFeaturesTable } = this.props;
    const { selectedRowKeys, dataSourceArray } = this.state;
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

    return (
      <Wrapper
        title="Редактирование фич в релизе"
        visible={isListOfAvailableFeaturesModal}
        onCancel={this.onCancel}
        width={1000}
        footer={this.renderFooterButtons()}
      >
        <Form>
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

          <WrapperForTables>
            <AvailableFeaturesTable>
              <Label> Список доступных фич </Label>
              <StyledSpin
                spinning={isLoadingFeaturesTable}
                indicator={<Icon type="loading" spin />}
              >
                {features && (
                  <StyledTable
                    rowSelection={rowSelectionForTableAvailableFeatures}
                    bordered={false}
                    dataSource={this.convertDataSourceIntoArray()} // gridData
                    columns={this.columns}
                    // pagination={{ pageSize: 6 }}
                    scroll={{ y: 240 }}
                    size="small"
                  />
                )}
              </StyledSpin>
            </AvailableFeaturesTable>
            <WrapperForFeaturesIncludedInReleaseTable>
              <Label>
                Список фич, включенных в релиз
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
              </Label>
              <StyledTable
                rowSelection={rowSelection}
                bordered={false}
                dataSource={dataSourceArray}
                columns={this.columns}
                scroll={{ y: 240 }}
                pagination={false}
                size="small"
                type={false}
              />
            </WrapperForFeaturesIncludedInReleaseTable>
          </WrapperForTables>
        </Form>
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
  rowIndex: PropTypes.array.isRequired,
  releases: PropTypes.array.isRequired,
};

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

const WrapperForTables = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 400px;
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

  .ant-table-small.ant-table-bordered .ant-table-placeholder {
    height: 250px;
  }
`;

const Label = styled.div`
  width: 400px;
  height: 30px;
  font-size: 16px;
  color: #000;
  font-family: T2_DisplaySerif_Bold_Short;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
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
    margin-left: 150px;
    color: #3fcbff;
    margin-top: 50px;
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

const AvailableFeaturesTable = styled.div``;
const WrapperForFeaturesIncludedInReleaseTable = styled.div``;
export default Form.create()(ListOfAvailableFeaturesModal);
