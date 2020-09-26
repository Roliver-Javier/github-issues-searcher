import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  saveFilteredIssues,
  setIssueTyped,
  setIssueSelected,
} from '../../store/actions/issuesAction';
import styles from './autocomplete.module.scss';
import AutocompleteList from './autocomplete-list/autocompleteList';
import useKeyPress from '../../hooks/useKeyPress';

const Autocomplete = ({
  issues,
  issueTyped,
  dataFiltered,
  setIssueTyped,
  saveFilteredIssues,
  setIssueSelected,
}) => {
  const [filteredIssues, setFilteredIssues] = useState([]);
  const childsRef = useRef();
  const containerRef = useRef();
  const [keywordIndex, setKeywordIndex] = useState(-1);
  const onChangeHandler = (event) => {
    setIssueTyped(event.target.value);
    if (!event.target.value && !event.target.value.length > 0) {
      setFilteredIssues([]);
    }
  };
  const removeActiveElem = (inputChilds) => {
    const inputChildsArray = Array.prototype.slice.call(inputChilds);
    inputChildsArray.map((it) => {
      if (it.classList.contains(styles.active)) {
        it.classList.remove(styles.active);
      }
    });
    return;
  };
  const arrowDownAction = () => {
    const inputChilds = childsRef.current.children;
    const index = keywordIndex < 0 ? 0 : keywordIndex + 1;
    if (inputChilds.length > 0 && keywordIndex < inputChilds.length - 1) {
      setKeywordIndex(index);
      removeActiveElem(inputChilds);
      inputChilds[index].classList.add(styles.active);
    }
  };
  const arrowUpAction = () => {
    const inputChilds = childsRef.current.children;
    const index = keywordIndex - 1;
    if (inputChilds.length > 0 && keywordIndex > 0) {
      setKeywordIndex(index);
      removeActiveElem(inputChilds);
      inputChilds[index].classList.add(styles.active);
    }
  };
  const enterAction = () => {
    const itemElement = { ...dataFiltered[keywordIndex], keywordIndex };
    setIssueSelected(itemElement);
    setIssueTyped(itemElement.title);
    saveFilteredIssues([itemElement]);
    setKeywordIndex(-1);
  };

  useEffect(() => {
    if (issueTyped !== '') {
      const regExp = new RegExp(issueTyped, 'i');
      saveFilteredIssues(issues.filter((issue) => issue.title.match(regExp)));
    } else {
      setIssueSelected(null);
      saveFilteredIssues([]);
    }
  }, [issueTyped, issues, saveFilteredIssues, setIssueSelected]);

  useKeyPress('ArrowDown', containerRef, arrowDownAction);
  useKeyPress('ArrowUp', containerRef, arrowUpAction);
  useKeyPress('Enter', containerRef, enterAction);

  return (
    <div className={styles.container} data-test='container' ref={containerRef}>
      <section className={styles.autocompleteFilter}>
        <input
          data-test='input-autocomplete'
          className={styles.primaryTxt}
          type='text'
          placeholder='Type Here'
          onChange={onChangeHandler}
          value={issueTyped}
        />
      </section>
      <AutocompleteList refChild={childsRef} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues.data,
    issueTyped: state.issues.issueTyped,
    dataFiltered: state.issues.dataFiltered,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setIssueTyped: (text) => dispatch(setIssueTyped(text)),

  saveFilteredIssues: (filteredIssues) =>
    dispatch(saveFilteredIssues(filteredIssues)),

  setIssueSelected: (issue, index) => dispatch(setIssueSelected(issue, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
