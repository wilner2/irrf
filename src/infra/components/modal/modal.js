import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MaterialTextField from '../text-field/index';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [cPF, setCPF] = useState(props.dados.cpf.replace(/[^\w\s]/gi, ''));
  const [nome, setNome] = useState(props.dados.nome);
  const [salario, setSalario] = useState(props.dados.salario);
  const [desconto, setDesconto] = useState(props.dados.desconto);
  const [dependentes, setDependentes] = useState(props.dados.dependentes);
  const [erro, setErro] = useState({});
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    nome: { '& .MuiTextField-root': { width: '50%' } },
    cpf: { '& .MuiTextField-root': { width: '24%' } },
    botao: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  function editarPessoas(pessoa, indicePessoa) {
    return { type: 'EDIT_PESSOAS', pessoa, indicePessoa };
  }

  const Enviar = () => {
    if (!nome.trim().replace(/\s+/g, ' ')) {
      setErro((prevstate) => {
        return { ...prevstate, nome: true };
      });
    }
    if (cPF.length !== 11 || !/^\d+$/.test(cPF)) {
      setErro((prevstate) => {
        return { ...prevstate, cPF: true };
      });
    }
    if (!cPF) {
      setErro((prevstate) => {
        return { ...prevstate, cPF: true };
      });
    }
    if (!salario) {
      setErro((prevstate) => {
        return { ...prevstate, salario: true };
      });
    }
    if (!desconto) {
      setErro((prevstate) => {
        return { ...prevstate, desconto: true };
      });
    }
    if (!toString(dependentes)) {
      setErro((prevstate) => {
        return { ...prevstate, dependentes: true };
      });
    }
    if (Object.values(erro).some((error) => error !== true)) {
      console.log('sssssssss');
      const dadosDaPessoa = {
        nome,
        cpf: cPF,
        salario,
        desconto,
        dependentes,
      };
      dispatch(editarPessoas(dadosDaPessoa, props.indicePessoa));
    }
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{props.component}</div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Recadastramento de Pessoa'}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.nome}>
              <MaterialTextField
                error={erro.nome}
                id={'standard-error'}
                value={nome}
                {...state.nome}
                onChange={(e) => {
                  setErro((prevstate) => {
                    return { ...prevstate, nome: false };
                  });
                  setNome(
                    e.target.value.replace(/[0-9]/g, '').replace(/\W|_/g, '')
                  );
                }}
              />
            </div>
            <div className={classes.cpf}>
              <MaterialTextField
                error={erro.cPF}
                value={cPF}
                {...state.cPF}
                onChange={(e) => {
                  {
                    setCPF(e.target.value.replace(/[^\d\s-/]/g, ''));
                    setErro((prevstate) => {
                      return { ...prevstate, cPF: false };
                    });
                  }
                }}
              />
            </div>
            <div>
              <MaterialTextField
                error={erro.salario}
                {...state.salario}
                value={salario}
                onChange={(e) => {
                  setErro((prevstate) => {
                    return { ...prevstate, salario: false };
                  });
                  setSalario(e.target.value.replace(/[^\d\s-/]/g, ''));
                }}
              />
            </div>
            <div>
              <MaterialTextField
                error={erro.desconto}
                value={desconto}
                {...state.desconto}
                onChange={(e) => {
                  setErro((prevstate) => {
                    return { ...prevstate, desconto: false };
                  });
                  setDesconto(e.target.value.replace(/[^\d\s-/]/g, ''));
                }}
              />
              <MaterialTextField
                error={erro.dependentes}
                value={dependentes}
                {...state.dependentes}
                onChange={(e) => {
                  setErro((prevstate) => {
                    return { ...prevstate, dependentes: false };
                  });
                  setDependentes(e.target.value.replace(/[^\d\s-/]/g, ''));
                }}
              />
            </div>
            <div className={classes.botao}></div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => Enviar()} color="primary">
            Agree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
