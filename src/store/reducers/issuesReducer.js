import {
  FETCH_ISSUES_SUCCESS,
  GET_FILTER_ISSUES,
  ISSUE_TYPED,
  SET_ISSUE_SELECTED,
} from '../types';

const initialState = {
  data: [],
  dataFiltered: [],
  issueTyped: '',
  issueSelected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ISSUES_SUCCESS:
      return { ...state, data: [...action.payload] };

    case GET_FILTER_ISSUES:
      return { ...state, dataFiltered: [...action.payload] };

    case ISSUE_TYPED:
      return { ...state, issueTyped: action.payload };

    case SET_ISSUE_SELECTED:
      return { ...state, issueSelected: action.payload };

    default:
      return state;
  }
};
