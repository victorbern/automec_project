import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import TextField from '@mui/material/TextField';

export default function AutocompleteVeiculos(props){
    const veiculos = props.state.veiculos;

    return(
        <>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        disabled={props.state.input}
        getOptionLabel={(veiculos) => (veiculos.veiculo_idCliente == props.state.idCliente) ? `${veiculos.placaVeiculo} - ${veiculos.modelo}` : ""}
        options={veiculos}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={`${props.state.placaVeiculo} - ${props.state.modelo}`}/>}
        onSelect={(veiculo) => props.atualizaCamposACVeiculo(veiculo)}
        renderOption={(props, veiculos) => (
            <li component="li" {...props} key={veiculos.placaVeiculo}>
                {veiculos.placaVeiculo} - {veiculos.modelo}
            </li>
        )}
        size="small"
        />
        </>
    )
}