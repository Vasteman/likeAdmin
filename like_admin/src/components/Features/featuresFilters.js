import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button, Checkbox } from 'antd';
// import PropTypes from 'prop-types';

class FeaturesFilters extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    // const { typesOfLikes } = this.props;
    // this.createTable(typesOfLikes);
  }

  // componentWillReceiveProps(nextProps) {
  //   // eslint-disable-next-line no-shadow
  //   // const { typesOfLikes } = nextProps;
  //   // console.log('nextProps', nextProps);
  //   // if (typesOfLikes) this.createTable(typesOfLikes);
  // }

  render() {
    // const { features } = this.props;
    console.log('state table', this.state);
    console.log('state props', this.props);
    return (
      <>
        <Wrapper>
          <WrapperForSearch>
            <StyledTitle> Название </StyledTitle>
            <Input size="small" />
            <Button type="primary"> Поиск </Button>

            <StyledTitle> Автор </StyledTitle>
            <Input size="small" />
            <Button type="primary"> Поиск </Button>

            <StyledTitle> ID </StyledTitle>
            <Input size="small" />
            <Button type="primary"> Поиск </Button>

            <StyledTitle> Активные </StyledTitle>
            <Checkbox> </Checkbox>
          </WrapperForSearch>
        </Wrapper>
      </>
    );
  }
}

FeaturesFilters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // features: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  // background-color: white;
  font-family: PT_Sans-Web-Regular;
  // border: 1px solid red;
  height: 200px;
  color: #000;
`;

const StyledTitle = styled.div`
  border: 1px solid red;
  width: 80px;
  text-align: center;
  font-size: 16px;
  height: 24px;
  margin-left: 40px;
`;

const WrapperForSearch = styled.div`
  display: flex;
  // border: 1px solid black;
  width: auto;

  .ant-input {
    width: 100px;
    margin: 0px 10px;
  }
  .ant-btn-primary {
    height: 24px;
    background-color: #3fcbff;
    border-color: #3fcbff;
  }

  .ant-checkbox-input {
    border: 1px solid red;
    margih-left: 30px;
  }
`;

export default FeaturesFilters;