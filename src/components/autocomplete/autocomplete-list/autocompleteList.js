import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  saveFilteredIssues,
  setIssueTyped,
  setIssueSelected,
} from '../../../store/actions/issuesAction';
import styles from './autocompleteList.module.scss';

const AutocompleteList = ({
  refChild,
  setIssueSelected,
  setIssueTyped,
  saveFilteredIssues,
  dataFiltered,
  issueSelected,
  issueTyped,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (issueSelected && issueSelected.title !== issueTyped) {
      setActiveIndex(-1);
      setIssueSelected(null);
    }
  }, [issueTyped, issueSelected, setIssueSelected]);

  const onItemClick = (index) => {
    setActiveIndex(index);
    const itemElement = { ...dataFiltered[index], index };
    setIssueSelected(itemElement);
    setIssueTyped(itemElement.title);
    saveFilteredIssues([itemElement]);
  };

  return (
    <section className={'panel ' + styles.container} ref={refChild}>
      {dataFiltered.map((issue, index) => (
        <div
          className={
            issueSelected && issueSelected.index === activeIndex
              ? `${styles.item} ${styles.active}`
              : styles.item
          }
          key={issue.id + index}
          onClick={() => onItemClick(index)}
        >
          {issue.title}
        </div>
      ))}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues.data,
    issueTyped: state.issues.issueTyped,
    issueSelected: state.issues.issueSelected,
    dataFiltered: state.issues.dataFiltered,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIssueTyped: (text) => dispatch(setIssueTyped(text)),
  saveFilteredIssues: (filteredIssues) =>
    dispatch(saveFilteredIssues(filteredIssues)),
  setIssueSelected: (issue, index) => dispatch(setIssueSelected(issue, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteList);
