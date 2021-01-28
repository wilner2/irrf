import React from 'react';
import { ButtonUI } from '../infra/components/botao/botaoUI';
import { makeStyles } from '@material-ui/core/styles';
import { EditIconUI } from '../infra/components/icons/iconsUI';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons({ name }) {
  const classes = useStyles();

  return (
    <div>
      <ButtonUI
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<EditIconUI />}
      >
        {name}
      </ButtonUI>
    </div>
  );
}
