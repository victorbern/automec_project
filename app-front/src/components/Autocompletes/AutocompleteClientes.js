import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import TextField from '@mui/material/TextField';


export default function AutocompleteClientes(props){
    const clientes = props.state.clientes;
    return(
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        disabled={props.state.input}
        getOptionLabel={(clientes) => `${clientes.idCliente} - ${clientes.nomeCliente} - ${clientes.celularCliente}`}
        options={clientes}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={`${props.state.idCliente} - ${props.state.nomeCliente} - ${props.state.celularCliente}`}/>}
        onSelect={(cliente) => props.atualizaCamposAC(cliente)}
        renderOption={(props, clientes) => (
            <li component="li" {...props} key={clientes.idCliente}>
                {clientes.idCliente} - {clientes.nomeCliente} - {clientes.celularCliente}
            </li>
        )}
        size="small"
        />
    )
}