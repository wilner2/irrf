import React, { useState } from 'react';
import { MaterialTextFieldUI } from '../infra/components/input/inputUI';
import { ButtonUI } from '../infra/components/botao/botaoUI';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { calculoIRRF } from '../functions/calculosIrrf';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
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
    let validacao = {};
    if (!nome.trim().replace(/\s+/g, ' ')) {
      validacao.nome = true;
      setErro((prevstate) => {
        return { ...prevstate, nome: true };
      });
    }
    if (cPF.length !== 11 || !/^\d+$/.test(cPF)) {
      validacao.cpf = true;
      setErro((prevstate) => {
        validacao.cpf = true;
        return { ...prevstate, cPF: true };
      });
    }
    if (!cPF) {
      validacao.cpf = true;

      setErro((prevstate) => {
        return { ...prevstate, cPF: true };
      });
    }

    if (!salario && toString(salario) !== '0') {
      validacao.salario = true;
      setErro((prevstate) => {
        return { ...prevstate, salario: true };
      });
    }
    if (!desconto && toString(desconto) !== '0') {
      validacao.desconto = true;
      console.log('ssssssssss');
      setErro((prevstate) => {
        return { ...prevstate, desconto: true };
      });
    }

    if (!dependentes && toString(dependentes) !== '0') {
      validacao.desconto = true;
      setErro((prevstate) => {
        return { ...prevstate, dependentes: true };
      });
    }
    if (Object.keys(validacao).length === 0) {
      const dadosDaPessoa = {
        nome,
        cpf: cPF,
        descontoIRRF: calculoIRRF(salario, desconto, dependentes),
        salario,
        desconto,
        dependentes,
      };
      return dispatch(togglePessoas(dadosDaPessoa));
    }
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <div className={classes.nome}>
            <MaterialTextFieldUI
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
            <MaterialTextFieldUI
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
            <MaterialTextFieldUI
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
            <MaterialTextFieldUI
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
            <MaterialTextFieldUI
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
            <ButtonUI variant="contained" onClick={() => Enviar()}>
              Cadastrar
            </ButtonUI>
          </div>
        </div>
      </form>
    </>
  );
}
export default ValidationTextFields;
