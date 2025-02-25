import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface CustomTextFieldProps {
    label: string;
    defaultValue?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    props?: TextFieldProps;
    marginLeft: string;
    marginTop: string
    width: string
    value?: number | string;
    
   
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({value, width, marginLeft, marginTop, label, defaultValue, onChange, props }) => {
    return (
        <TextField
        value={value}
            size="small"
            label={label}
            id="outlined-basic"
            defaultValue={defaultValue}
            onChange={onChange}
            InputLabelProps={{
                style: { color: 'white', fontFamily: 'Michroma', fontSize:"0.9rem" }, // Change label color
            }}
            InputProps={{
                style: { color: 'white',fontFamily: 'Michroma', }, // Change input text color
                classes: {
                    notchedOutline: 'custom-notched-outline', // Custom class for the border
                },
            }}
            sx={{
                marginLeft: marginLeft,
                marginTop: marginTop,
                color: "white",
                
                width: { width },
                height: '4.4ch',
                '& .MuiOutlinedInput-root': {
                    height: '100%', // Ensure the input takes the full height of the TextField
                    '& fieldset': {
                        borderColor: 'white', // Change border color
                    },
                    '&:hover fieldset': {
                        borderColor: 'white', // Change border color on hover
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white', // Change border color when focused
                    },
                },
                '& .MuiOutlinedInput-input': {
                    color: "white",
                    padding: '10px 14px', // Adjust padding to vertically center the text
                    fontFamily: 'Rubik',
                    fontSize: '1rem',
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