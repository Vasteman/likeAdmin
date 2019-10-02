/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button, Popconfirm, Icon, Form, Checkbox, Table, Input, Collapse } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

let gridData = [];
let arrayForSelectedRows = [];

class ListOfAvailableFeaturesModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  componentDidMount() {
    const {
      // selectedRow,
      form: { validateFields },
      fetchFeatures,
    } = this.props;
    fetchFeatures({});
    validateFields();
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { features } = nextProps;
    if (features) this.createTable(features);
  }

  onOK = () => {
    // const { createRelease,} = this.props;

    // if (action === 'create' || action === 'edit') createRelease(this.state);
    arrayForSelectedRows = [];
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
        author: feature.FeatureAuthor,
        featureDate: feature.FeatureDate,
        featureId: feature.FeatureId,
        featureName: feature.FeatureName,
        featureStatus: feature.IsLikeActive,
      };
      return item;
    });
  };

  convertDataSourceIntoArray = () => {
    const { features } = this.props;
    gridData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < features.length; i++) {
      // массив для того, чтобы сравнивать с ним выбранные строки
      gridData.push({
        key: i,
        author: features[i].FeatureAuthor,
        featureDate: features[i].FeatureDate,
        featureName: features[i].FeatureName,
        featureStatus: features[i].IsLikeActive,
      });
    }
    return gridData;
  };

  createTable = features => {
    this.dataSource = this.createDataSource(features);

    this.columns = [
      {
        title: 'Название',
        dataIndex: 'featureName',
        key: 'featureName',
        width: '40%',
      },
      {
        title: 'Активно',
        dataIndex: 'featureStatus',
        key: 'featureStatus',
        width: '15%',
        sorter: (first, second) => first.featureStatus - second.featureStatus,
        render: (text, record) => {
          return <Checkbox checked={record.featureStatus} />;
        },
      },
      {
        title: 'Дата создания',
        dataIndex: 'featureDate',
        key: 'featureDate',
        width: '30%',
        render: value => {
          return value ? moment(value).format('DD.MM.YYYY HH:mm') : '';
        },
      },
    ];
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onSelectChange = selectedRowKeys => {
    arrayForSelectedRows = [];
    selectedRowKeys.map(index => {
      return arrayForSelectedRows.push(gridData[index]);
    });

    this.setState({ selectedRowKeys });
    console.log('arrayForSelectedRows', arrayForSelectedRows);
    return arrayForSelectedRows;
  };

  addFeaturesIntoRelease = () => {
    console.log('addFeaturesIntoRelease');
  };

  render() {
    const { isListOfAvailableFeaturesModal, features } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        this.onSelectRow(record, selected, selectedRows);
      },
      type: 'checkbox',
    };

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
                onChange={elem => this.ChangeField('featureName', elem.target.value)}
              />
              <StyledButtonPrimary type="primary"> Найти </StyledButtonPrimary>
            </WrapperForSearchLine>

            <Collapse bordered={false}>
              <Collapse.Panel header="Показать доступные фичи">
                {features && (
                  <StyledTable
                    rowSelection={rowSelection}
                    bordered
                    dataSource={this.convertDataSourceIntoArray()}
                    columns={this.columns}
                    // pagination={{ pageSize: 6 }}
                    scroll={{ y: 190 }}
                    size="small"
                  />
                )}
              </Collapse.Panel>
            </Collapse>
          </WrapperForAvailableFeatures>
          <WrapperIncludedInReleaseFeatures>
            <Label> Список фич, включенных в релиз </Label>
            <StyledTable
              rowSelection={rowSelection}
              bordered
              dataSource={arrayForSelectedRows}
              columns={this.columns}
              scroll={{ y: 190 }}
              pagination={false}
              size="small"
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
  form: PropTypes.object.isRequired,
  validateFields: PropTypes.func.isRequired,
  features: PropTypes.array.isRequired,
  fetchFeatures: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
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

export default Form.create()(ListOfAvailableFeaturesModal);
