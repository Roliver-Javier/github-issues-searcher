import {
  FETCH_ISSUES_SUCCESS,
  ISSUE_TYPED,
  FETCH_ISSUES_REJECTED,
  SET_ISSUE_SELECTED,
  GET_FILTER_ISSUES,
  GET_ISSUES,
  FILTER_ISSUES,
  ISSUE_SELECTED,
} from '../types';

/** actions */
export const fetchIssuesRepoInfo = () => ({ type: GET_ISSUES });
export const getIssuesSuccess = (issues) => ({
  type: FETCH_ISSUES_SUCCESS,
  payload: issues,
});
export const getIssueFailure = (error) => ({
  type: FETCH_ISSUES_REJECTED,
  payload: error.xhr.response,
});

export const addIssueSelected = (issueSelected) => ({
  type: SET_ISSUE_SELECTED,
  payload: issueSelected,
});
export const setIssueSelected = (issueSelected) => ({
  type: ISSUE_SELECTED,
  payload: issueSelected,
});

export const getFielterIssues = (filteredIssues) => ({
  type: GET_FILTER_ISSUES,
  payload: filteredIssues,
});
export const saveFilteredIssues = (filteredIssues) => ({
  type: FILTER_ISSUES,
  payload: filteredIssues,
});

export const setIssueTyped = (text) => ({
  type: ISSUE_TYPED,
  payload: text,
});
