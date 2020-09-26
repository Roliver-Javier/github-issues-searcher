import React from 'react';
import styles from './item.module.scss';
import { endpoints } from '../../../../global/endpoints';
import { getDateFormat } from '../../../../helpers/dateTimeString';
import PropTypes from 'prop-types';

const Item = ({ title, labels, state, created_at, number, user }) => {
  return (
    <div className={styles.container} data-test='test-container'>
      <div className={styles.header}>
        <a href={`${endpoints.GITHUB_URL}${endpoints.ISSUES}/${number}`}>
          {title}
        </a>
        <span className={styles.repoInfo}>{`#${number}  opened ${getDateFormat(
          created_at
        )}  by ${user.login}`}</span>

        <div className={styles.userContainer}>
          <img
            data-test='author-image'
            src={user.avatar_url}
            width='100px'
            height='100px'
            alt={user.login}
          />
          <div className={styles.userInfo}>
            <span className='label'>
              Author:
              <div className='value' data-test='author-nickname'>
                {user.login}
              </div>
            </span>
            <span className={'label ' + styles.status}>
              Status:
              <ul>
                <li style={{ color: state === 'open' ? 'green' : 'red' }}>
                  <small data-test='issue-state'>{state}</small>
                </li>
              </ul>
            </span>
            <span data-test='author-github'>
              <div className='label'>Github: </div>
              <small>
                <a href={user.url}>{user.url}</a>
              </small>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.labelsContainer}>
        {labels.map((label) => (
          <span
            className={styles.itemLabels}
            key={label.id}
            style={{ backgroundColor: '#' + label.color }}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Item;
