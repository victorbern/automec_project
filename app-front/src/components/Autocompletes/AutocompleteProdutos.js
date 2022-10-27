import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import TextField from '@mui/material/TextField';

export default function AutocompleteProdutos(props){
    const produtos = props.state.produtos;

    return(
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        disabled={props.state.input}
        getOptionLabel={(produtos) => (props.state.clearP == false ) ?  `${produtos.codigoBarras} - ${produtos.descricao} - ${produtos.precoVenda}`:""}
        options={produtos}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={`${props.state.codigoBarras} - ${props.state.descricao} - ${props.state.precoVenda}`}/>}
        onSelect={(produto) => {props.atualizaCamposACProduto(produto)}}
        renderOption={(props, produtos) => (
            <li component="li" {...props} key={produtos.codigoBarras}>
                {produtos.codigoBarras} - {produtos.descricao} - {produtos.precoVenda}
            </li>
        )}
        size="small"
        />
    )
}