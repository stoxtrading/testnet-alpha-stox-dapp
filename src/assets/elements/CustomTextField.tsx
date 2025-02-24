import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface CustomTextFieldProps {
    label: string;
    defaultValue?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    props?: TextFieldProps;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, defaultValue, onChange, props }) => {
    return (
        <TextField
            size="small"
            label={label}
            id="outlined-basic"
            defaultValue={defaultValue}
            onChange={onChange}
            sx={{
                color: "white",
                width: '10ch',
                height: '35px', // Increase the height
                '& .MuiOutlinedInput-root': {
                    height: '100%', // Ensure the input takes the full height of the TextField
                },
                '& .MuiOutlinedInput-input': {
                    color: "white",
                    padding: '10px 14px', // Adjust padding to vertically center the text
                    fontFamily: 'Michroma',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                },
                '& .MuiInputAdornment-root': {
                    height: '25px',
                    color: "white",
                },
            }}
            {...props}
        />
    );
};

export default CustomTextField;