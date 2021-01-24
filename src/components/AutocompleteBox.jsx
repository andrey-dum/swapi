import React from 'react'
import { useHistory } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

export const AutocompleteBox = ({items, setSelected}) => {
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const history = useHistory()

    return (
        <Autocomplete
            id="combo-box-demo"
            options={items}
            onChange={(event, obj) => {
                setValue(obj);
                setSelected(obj)
                if(!!obj) {
                    history.push(`/profile/${obj.name.split(' ').join('-').toLowerCase()}`)
                }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            getOptionLabel={(option) => option.name}
            style={{ width: 300, marginBottom: 20 }}
            renderInput={(params) => <TextField {...params} label="Character name" variant="outlined" />}
      />
    )
}
