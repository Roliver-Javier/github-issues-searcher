import { combineEpics } from 'redux-observable';
import {
  getIssuesEpic,
  saveFilteredIssuesEpic,
  setIssueSelectedEpic,
  setIssueTypingEpic,
} from './issueEpic';

const roots = combineEpics(
  getIssuesEpic,
  saveFilteredIssuesEpic,
  setIssueSelectedEpic,
  setIssueTypingEpic
);

export default roots;
