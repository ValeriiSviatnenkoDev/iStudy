import React, { useState } from 'react';

const useInput = (initial:string, required:boolean) => {
    const [value, setValue] = useState(initial);
    const [_errorstyle, setErrStyle] = useState<string>('');
    const [_errmsg, setErrMsg] = useState<string | null>(null);

    

    return {
        value,
        _errorstyle,
        _errmsg,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            if(!e.target.value && required) {
                setErrStyle('2px solid #EB0055');
                setErrMsg('Please enter your data for authorization!');
            } else {
                setErrStyle('2px solid #846aad');
                setErrMsg(null);
            }
        } 
    }
}

export default useInput;