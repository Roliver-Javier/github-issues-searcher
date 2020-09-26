import {
  FETCH_ISSUES_INFO_FROM_REPO,
  GET_FIELTERED_ISSUES,
  ISSUE_TYPED,
  SET_ISSUE_SELECTED,
} from '../../store/types';
import issuesReducer from '../../store/reducers/issuesReducer';
import { mockData } from '../../../utils';

describe('Issues Reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      data: [],
      dataFiltered: [],
      issueTyped: '',
      issueSelected: null,
    };
  });
  it('Should return default state', () => {
    const newState = issuesReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return new issue selected state if receiving type', () => {
    const data = {
      type: SET_ISSUE_SELECTED,
      payload: { ...mockData.issueSelected },
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.issueSelected).toEqual(data.payload);
  });

  it('Should return new issue typed if receiving type', () => {
    const data = {
      type: ISSUE_TYPED,
      payload: 'something is typing...',
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.issueTyped).toEqual(data.payload);
  });

  it('Should return new data filtered if receiving type', () => {
    const data = {
      type: GET_FIELTERED_ISSUES,
      payload: [...mockData.dataFiltered],
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.dataFiltered).toEqual(data.payload);
  });

  it('Should return new issues data if receiving type', () => {
    const data = {
      type: FETCH_ISSUES_INFO_FROM_REPO,
      payload: [...mockData.issues],
    };
    const newState = issuesReducer(initialState, data);
    expect(newState.data).toEqual(data.payload);
  });
});
