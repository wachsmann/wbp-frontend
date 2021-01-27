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

export default function DataVisualizationTable(props) {
  const classes = useStyles();

  const {handleDelete,vehicles} = props

  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Prefixo</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell align="left">Capacidade</TableCell>          
            <TableCell align="left">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            vehicles && Object.keys(vehicles).map((key, index) => {
              debugger
              let row = vehicles[key]
                return (
                  <TableRow key={row._id}>
                    <TableCell align="left" component="th" scope="row">{row.prefix} </TableCell>
                    <TableCell align="left">{row.plate}</TableCell>
                    <TableCell align="left">{row.capacity}</TableCell>
                    <TableCell align="left">
                      <IconButton onClick={()=>handleDelete(key)} aria-label="Excluir"><DeleteIcon /></IconButton></TableCell>
                  </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
