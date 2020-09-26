import { ofType } from 'redux-observable';
import * as Api from '../../global/api';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  getIssueFailure,
  addIssueSelected,
  getFielterIssues,
  getIssuesSuccess,
  setIssueTyped,
} from '../actions/issuesAction';

import {
  GET_ISSUES_REPO,
  ISSUE_SELECTED,
  FILTER_ISSUES,
  SET_ISSUES_TYPED,
} from '../types';

/** EPICS */
export const getIssuesEpic = (action$) =>
  action$.pipe(
    ofType(GET_ISSUES_REPO),
    switchMap(() =>
      Api.getIssues().pipe(catchError((error) => getIssueFailure(error)))
    ),
    map((issues) => getIssuesSuccess(issues))
  );

export const setIssueSelectedEpic = (action$) =>
  action$.pipe(
    ofType(ISSUE_SELECTED),
    map((action) => addIssueSelected(action.payload))
  );

export const saveFilteredIssuesEpic = (action$) =>
  action$.pipe(
    ofType(FILTER_ISSUES),
    map((action) => getFielterIssues(action.payload))
  );

export const setIssueTypingEpic = (action$) =>
  action$.pipe(
    ofType(SET_ISSUES_TYPED),
    map((action) => setIssueTyped(action.payload))
  );
