import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        classes={{ colorPrimary: classes.colorPrimary }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img
              style={{ height: '36px' }}
              alt=""
              src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png"
            />
          </IconButton>
          <Typography variant="h6" className={classes.title} />
          <Button style={{ color: '#188fff', textTransform: 'capitalize' }}>
            Help
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
