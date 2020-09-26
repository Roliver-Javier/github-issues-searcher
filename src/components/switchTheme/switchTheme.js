import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setTheme, toggleChecked } from '../../store/actions/lookNfeelAction';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';

const SwitchTheme = ({ setTheme, toggleChecked, switchCheck }) => {
  useEffect(() => {
    setTheme(switchCheck ? 'light' : 'dark');
  }, [setTheme, switchCheck]);
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={switchCheck} onChange={toggleChecked} />}
        label={switchCheck ? 'Turn off' : 'Turn on'}
      />
    </FormGroup>
  );
};
const mapStateToProps = (state) => ({
  switchCheck: state.lookAndFeel.toggleCheck,
});
const mapDispatchToProps = (dispatch) => ({
  setTheme: (val) => dispatch(setTheme(val)),
  toggleChecked: () => dispatch(toggleChecked()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SwitchTheme);
