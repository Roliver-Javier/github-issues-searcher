import { combineReducers } from 'redux';
import lookNfeelReducer from './lookNfeelReducer';
import issuesReducer from './issuesReducer';

export default combineReducers({
  lookAndFeel: lookNfeelReducer,
  issues: issuesReducer,
});
