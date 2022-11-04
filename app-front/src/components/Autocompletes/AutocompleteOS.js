import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import TextField from '@mui/material/TextField';


export default function AutocompleteOS(props){
    const ordensServico = props.state.ordensServico;
    const [value, setValue] = React.useState(ordensServico[0]);
    const [inputValue, setInputValue] = React.useState('');
    
    return(
        <Autocomplete
        id="combo-box-demo"
        disabled={props.state.input}
        getOptionLabel={(ordensServico) => (props.state.clearOS == false ) ? `${ordensServico.idOrdemServico} - ${ordensServico.cliente.nomeCliente} - ${ordensServico.veiculo.placaVeiculo} - ${ordensServico.total}` : ""}
        options={ordensServico}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={`${props.state.idOrdemServico} - ${props.state.nomeCliente} - ${props.state.placaVeiculo} - ${props.state.totalOS}`}/>}
        // onSelect={(ordemServico) => props.atualizaCamposACOrdensServico(ordemServico)}
        onChange={(event, newValue) => {
            setValue(newValue);
            props.atualizaCamposACOrdensServico(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        renderOption={(props, ordensServico) => (
            <li component="li" {...props} key={ordensServico.idOrdemServico}>
                {ordensServico.idOrdemServico} - {ordensServico.cliente.nomeCliente} - {ordensServico.veiculo.placaVeiculo} - {ordensServico.total}
            </li>
        )}
        size="small"
        />
    )
}