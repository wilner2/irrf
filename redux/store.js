import { createStore } from 'redux';
import jsonPessoas from '../pessoa.json';
import { calculoIRRF } from '../src/functions/calculosIrrf';

const INITIAL_STATE = {
  pessoas: jsonPessoas.map((pessoa) => {
    return {
      ...pessoa,
      descontoIRRF: calculoIRRF(
        pessoa.salario,
        pessoa.desconto,
        pessoa.dependentes
      ),
    };
  }),
  nome: {
    id: 'standard-error',
    label: 'Nome',
    variant: 'outlined',
  },
  cPF: {
    id: 'standard-error',
    label: 'CPF',
    variant: 'outlined',
  },
  salario: {
    id: 'standard-error',
    label: 'Sálario',
    variant: 'outlined',
  },
  desconto: {
    id: 'standard-error',
    label: 'Desconto',
    variant: 'outlined',
  },
  dependentes: {
    id: 'standard-error',
    label: 'Dependentes',
    variant: 'outlined',
  },
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'TOOGLE_PESSOAS') {
    return {
      ...state,
      pessoas: [...state.pessoas, action.pessoa],
    };
  }
  if (action.type === 'DELETE_PESSOAS') {
    return {
      ...state,
      pessoas: state.pessoas.filter((v, i) => i !== action.pessoa),
    };
  }
  if (action.type === 'EDIT_PESSOAS') {
    return {
      ...state,
      pessoas: state.pessoas.map((pessoa, i) => {
        if (i === action.indicePessoa) {
          return action.pessoa;
        } else {
          return pessoa;
        }
      }),
    };
  }

  return state;
}
const store = createStore(reducer);
export default store;
