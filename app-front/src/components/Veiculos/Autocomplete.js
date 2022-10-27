import { useEffect, useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(state) {

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
        fetch('http://localhost:3000/api/clientes/'+"")
        .then(resposta => resposta.json())
        .then(dados => {
            const clientes = dados.result;
            setClientes(clientes);
        });
    })
    
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(clientes) => `${clientes.idCliente} - ${clientes.nomeCliente} - ${clientes.celularCliente}`}
      options={clientes}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Cliente" />}
      onSelect={(cliente) => state.setState({veiculo_idCliente: (cliente.target.value).slice(0,2)})}
      renderOption={(props, clientes) => (
        <li component="li" {...props} key={clientes.idCliente}>
            {clientes.nomeCliente} - {clientes.celularCliente}

        </li>
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

