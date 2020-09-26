import React, { useEffect } from 'react';
import styles from './homePage.module.scss';
import { connect } from 'react-redux';
import ItemList from './components/itemList/itemList';
import TopSection from './components/topSection/topSection';
import Autocomplete from '../../components/autocomplete/autocomplete';
import { fetchIssuesRepoInfo } from '../../store/actions/issuesAction';

const HomePage = ({ issueSelected, getIssues }) => {
  useEffect(() => {
    getIssues();
  }, [getIssues]);

  return (
    <section className={styles.container}>
      <TopSection />

      <div className={styles.wrapContainer}>
        <Autocomplete />
        {issueSelected !== null && (
          <div className={styles.itemWrap}>
            <ItemList />
          </div>
        )}
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getIssues: () => dispatch(fetchIssuesRepoInfo()),
});
const mapStateToProps = (state) => ({
  filteredIssues: state.issues.dataFiltered,
  issueSelected: state.issues.issueSelected,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
