import {
  GET_ISSUES_REPO,
  FETCH_ISSUES_INFO_FROM_REPO,
  FILTER_ISSUES,
  GET_FIELTERED_ISSUES,
  ISSUE_SELECTED,
  SET_ISSUE_SELECTED,
  SET_ISSUES_TYPED,
  ISSUE_TYPED,
} from '../../store/types';
import { of, Subscription } from 'rxjs';
import {
  getIssuesEpic,
  saveFilteredIssuesEpic,
  setIssueSelectedEpic,
  setIssueTypingEpic,
} from '../../store/epics/issueEpic';

describe('Issues Epic Observables', () => {
  let subscription = new Subscription();
  beforeEach(() => {
    subscription = new Subscription();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('Should return action with successful data fetched', (done) => {
    const action$ = of({ type: GET_ISSUES_REPO });
    const epic$ = getIssuesEpic(action$);
    subscription.add(
      epic$.subscribe((action) => {
        expect(action.type).toBe(FETCH_ISSUES_INFO_FROM_REPO);
        done();
      })
    );
  });

  it('Should return action with save filtered issues', (done) => {
    const action$ = of({ type: FILTER_ISSUES });
    const epic$ = saveFilteredIssuesEpic(action$);
    subscription.add(
      epic$.subscribe((action) => {
        expect(action.type).toBe(GET_FIELTERED_ISSUES);
        done();
      })
    );
  });

  it('Should return action with selected issue', (done) => {
    const action$ = of({ type: ISSUE_SELECTED });
    const epic$ = setIssueSelectedEpic(action$);
    subscription.add(
      epic$.subscribe((action) => {
        expect(action.type).toBe(SET_ISSUE_SELECTED);
        done();
      })
    );
  });

  it('Should return action with typed issue', (done) => {
    const action$ = of({ type: SET_ISSUES_TYPED });
    const epic$ = setIssueTypingEpic(action$);
    subscription.add(
      epic$.subscribe((action) => {
        expect(action.type).toBe(ISSUE_TYPED);
        done();
      })
    );
  });
});
