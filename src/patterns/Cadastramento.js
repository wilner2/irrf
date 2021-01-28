import React, { useState } from 'react';
import MaterialTextField from '../infra/components/text-field/index';
import MaterialButton from '../infra/components/botao/index';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
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

function ValidationTextFields() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const classes = useStyles();
  const [cPF, setCPF] = useState('');
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState('');
  const [desconto, setDesconto] = useState('');
  const [dependentes, setDependentes] = useState('');
  const [erro, setErro] = useState({});

  function togglePessoas(pessoa) {
    return { type: 'TOOGLE_PESSOAS', pessoa };
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
    if (!dependentes) {
      setErro((prevstate) => {
        return { ...prevstate, dependentes: true };
      });
    }
    if (Object.values(erro).some((error) => error !== true)) {
      const dadosDaPessoa = {
        nome,
        cpf: cPF,
        salario,
        desconto,
        dependentes,
      };
      dispatch(togglePessoas(dadosDaPessoa));
    }
  };

  return (
    <>
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
        <div className={classes.botao}>
          <MaterialButton variant="contained" onClick={() => Enviar()}>
            Cadastrar
          </MaterialButton>
        </div>
      </form>
    </>
  );
}
export default ValidationTextFields;
