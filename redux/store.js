import { createStore } from 'redux';
import jsonPessoas from '../pessoa.json';

const INITIAL_STATE = {
  pessoas: jsonPessoas,
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
  return state;
}
const store = createStore(reducer);
export default store;
