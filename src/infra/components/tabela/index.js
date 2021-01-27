import React, { useState, useEffect } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import store from '../../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(
  {
    table: {
      minWidth: 700,
    },
  },
  { index: 1 }
);

const CustomizedTables = () => {
  const state = useSelector((state) => state);
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>CPF</StyledTableCell>
              <StyledTableCell>Sálario</StyledTableCell>
              <StyledTableCell>Desconto</StyledTableCell>
              <StyledTableCell>Dependentes</StyledTableCell>
              <StyledTableCell>Desconto IRRF</StyledTableCell>
              <StyledTableCell>Editar</StyledTableCell>
              <StyledTableCell>Deletar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.pessoas.map((row) => (
              <StyledTableRow key={row.cpf}>
                <StyledTableCell component="th" scope="row">
                  {row.nome}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.cpf}
                </StyledTableCell>
                <StyledTableCell>{row.salario}</StyledTableCell>
                <StyledTableCell>{row.desconto}</StyledTableCell>
                <StyledTableCell>{row.dependentes}</StyledTableCell>
                <StyledTableCell>{'Desconto IRRF'}</StyledTableCell>
                <StyledTableCell>{'Editar'}</StyledTableCell>
                <StyledTableCell>{'Deletar'}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
