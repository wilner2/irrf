import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons({ name }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<EditIcon />}
      >
        {name}
      </Button>
    </div>
  );
}
