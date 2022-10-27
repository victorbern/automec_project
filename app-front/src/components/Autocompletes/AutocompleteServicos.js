import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import TextField from '@mui/material/TextField';


export default function AutocompleteServicos(props){
    const clientes = props.state.servicos;
    return(
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        disabled={props.state.input}
        getOptionLabel={(servicos) => (props.state.clearS == false ) ? `${servicos.idServico} - ${servicos.descricaoServico} - ${servicos.precoServico}` : ""}
        options={clientes}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={`${props.state.idServico} - ${props.state.descricaoServico} - ${props.state.precoServico}`}/>}
        onSelect={(servico) => props.atualizaCamposACServico(servico)}
        renderOption={(props, servicos) => (
            <li component="li" {...props} key={servicos.idServico}>
                {servicos.idServico} - {servicos.descricaoServico} - {servicos.precoServico}
            </li>
        )}
        size="small"
        />
    )
}