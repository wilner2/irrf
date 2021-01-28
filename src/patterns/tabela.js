import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  TableUI,
  TableBodyUI,
  TableCellUI,
  TableContainerUI,
  TableHeadUI,
  TableRowUI,
} from '../infra/components/tabela/tabelaUI';
import { PaperUi } from '../infra/components/paper/paperUI';
import BotaoDeletar from '../components/delete';
import BotaoEditar from '../components/edit';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCellUI);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRowUI);

const useStyles = makeStyles(
  {
    table: {
      minWidth: 700,
    },
  },
  { index: 1 }
);

const CustomizedTables = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  function handleClose() {
    setOpenModal(false);
  }

  function toggleDeletePessoas(pessoa) {
    return { type: 'DELETE_PESSOAS', pessoa };
  }
  function deletarDadosPessoa(indice) {
    dispatch(toggleDeletePessoas(indice));
  }
  function editarDadosPessoa() {
    setOpenModal(true);
  }

  return (
    <>
      <TableContainerUI component={PaperUi}>
        <TableUI className={classes.table} aria-label="customized table">
          <TableHeadUI>
            <TableRowUI>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>CPF</StyledTableCell>
              <StyledTableCell>Sálario</StyledTableCell>
              <StyledTableCell>Desconto</StyledTableCell>
              <StyledTableCell>Dependentes</StyledTableCell>
              <StyledTableCell>Desconto IRRF</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRowUI>
          </TableHeadUI>
          <TableBodyUI>
            {state.pessoas.map((row, indice) => (
              <StyledTableRow key={row.cpf}>
                <StyledTableCell component="th" scope="row">
                  {row.nome}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    '$1.$2.$3-$4'
                  )}
                </StyledTableCell>
                <StyledTableCell>{row.salario}</StyledTableCell>
                <StyledTableCell>{row.desconto}</StyledTableCell>
                <StyledTableCell>{row.dependentes}</StyledTableCell>
                <StyledTableCell>{row.descontoIRRF.toFixed(2)}</StyledTableCell>
                <StyledTableCell>
                  <div
                    onClick={() => {
                      editarDadosPessoa(indice);
                    }}
                  >
                    <Modal
                      dados={state.pessoas.find((v, i) => indice === i)}
                      indicePessoa={indice}
                      open={openModal}
                      onClose={handleClose}
                      component={<BotaoEditar name="Editar" />}
                    ></Modal>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    onClick={() => {
                      deletarDadosPessoa(indice);
                    }}
                  >
                    <BotaoDeletar name="Deletar" />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBodyUI>
        </TableUI>
      </TableContainerUI>
    </>
  );
};

export default CustomizedTables;
