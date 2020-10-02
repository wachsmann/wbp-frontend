import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxHeight: 400
  },
});

function createData(name, street, neighborhood, city, cep, status) {
  return { name, street, neighborhood, city, cep, status };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, true),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, true),
  createData('Eclair', 262, 16.0, 24, 6.0, true),
  createData('Cupcake', 305, 3.7, 67, 4.3, true),
  createData('Gingerbread', 356, 16.0, 49, 3.9, true),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, true),
  createData('Eclair', 262, 16.0, 24, 6.0, true),
  createData('Cupcake', 305, 3.7, 67, 4.3, true),
  createData('Gingerbread', 356, 16.0, 49, 3.9, true),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, true),
  createData('Eclair', 262, 16.0, 24, 6.0, true),
  createData('Cupcake', 305, 3.7, 67, 4.3, true),
  createData('Gingerbread', 356, 16.0, 49, 3.9, true),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, true),
  createData('Eclair', 262, 16.0, 24, 6.0, true),
  createData('Cupcake', 305, 3.7, 67, 4.3, true),
  createData('Gingerbread', 356, 16.0, 49, 3.9, true),
];

export default function DataVisualizationTable(props) {
  const classes = useStyles();

  const {handleDelete,passengers} = props

  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Matrícula</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="left">Rua</TableCell>
            <TableCell align="left">Bairro</TableCell>
            <TableCell align="left">Cidade</TableCell>
            <TableCell align="left">CEP</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            passengers && Object.keys(passengers).map((key, index) => {
              let row = passengers[key]
                return (
                  <TableRow key={row.getId()}>
                    <TableCell align="left" component="th" scope="row">{row.identifier} </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.street}</TableCell>
                    <TableCell align="left">{row.neighborhood}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.cep}</TableCell>
                    <TableCell align="left">
                      {
                      row.status ? 
                      <CheckIcon title="Localização válida" fontSize="small" /> : 
                      <ErrorIcon title="Localização inválida" fontSize="small" />
                      }
                    </TableCell>
                    <TableCell align="left">
                      <IconButton onClick={()=>handleDelete(row.getId())} aria-label="Excluir"><DeleteIcon /></IconButton></TableCell>
                  </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
