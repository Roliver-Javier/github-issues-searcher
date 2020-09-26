import React from 'react';
import { connect } from 'react-redux';
import styles from './itemList.module.scss';
import Item from '../item/item';

const ItemList = ({ issueSelected }) => {
  return (
    <div className={'panel ' + styles.container} data-test='test-container'>
      {Object.keys(issueSelected).length > 0 && (
        <Item data-test='item' {...issueSelected} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  issueSelected: state.issues.issueSelected,
});

export default connect(mapStateToProps, null)(ItemList);
