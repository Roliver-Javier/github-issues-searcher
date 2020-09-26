import React from 'react';
import Typography from '@material-ui/core/Typography';
import SwitchTheme from '../../../../components/switchTheme/switchTheme';
import styles from './topSection.module.scss';

const TopSection = () => {
  return (
    <div className={styles.topContent}>
      <Typography variant='h5' gutterBottom>
        Search for React Issues
      </Typography>
      <SwitchTheme></SwitchTheme>
    </div>
  );
};

export default TopSection;
