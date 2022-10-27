import React from "react";
import {Table} from 'react-bootstrap';

export default function Listagem(props){
    return(
        <Table>
        <thead>
        <tr>
            {props.state.column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
        </thead>
        <tbody>
            {props.state.tableData.map((item, index) => <TableRow item={item} column={props.state.column} abrirModalDetalhar={props.abrirModalDetalhar} />)}
        </tbody>
    </Table>
    )
}

const TableHeadItem = ({item}) => <th>{item.heading}</th>

const TableRow = ({ item, column, abrirModalDetalhar }) => (
    <tr onClick={() => abrirModalDetalhar(item)}>
      {
      column.map((columnItem, index) => {
        if(columnItem.value.includes('.')) {
            const itemSplit = columnItem.value.split('.') //['address', 'city']
            return <td>{item[itemSplit[0]][itemSplit[1]]}</td>
          }
        return <td>{item[`${columnItem.value}`]}</td>
      })}
    </tr>
)