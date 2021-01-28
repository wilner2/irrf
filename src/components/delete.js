import React from 'react';
import { ButtonUI } from '../infra/components/botao/botaoUI';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteIconUI } from '../infra/components/icons/iconsUI';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons({ name }) {
  const classes = useStyles();

  return (
    <ButtonUI
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<DeleteIconUI />}
    >
      {name}
    </ButtonUI>
  );
}
