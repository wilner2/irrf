import Tabela from '../src/patterns/tabela';
import store from '../redux/store';
import { Provider } from 'react-redux';
import Cadastramento from '../src/patterns/Cadastramento';
import React from 'react';

export default function Home() {
  return (
    <Provider store={store}>
      <Cadastramento></Cadastramento>
      <Tabela></Tabela>
    </Provider>
  );
}
