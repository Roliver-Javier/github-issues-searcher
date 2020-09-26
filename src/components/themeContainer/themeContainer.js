import React, { Suspense, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import useBodyClass from '../../hooks/useBodyClass';
import { Container } from '@material-ui/core';

const ThemeContainer = ({ children, theme }) => {
  useBodyClass(theme);
  const circularLoader = (
    <Grid
      style={{ height: '100vh' }}
      container
      justify='center'
      alignItems='center'
    >
      <CircularProgress />
    </Grid>
  );
  return (
    <Suspense fallback={circularLoader}>
      <Switch>
        <Fragment>
          <Container maxWidth='xl'>{children}</Container>
        </Fragment>
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  theme: state.lookAndFeel.theme,
});

export default connect(mapStateToProps, {})(ThemeContainer);
