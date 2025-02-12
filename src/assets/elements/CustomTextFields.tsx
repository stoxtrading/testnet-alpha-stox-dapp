import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';


const AmountTextField = styled(TextField)<TextFieldProps>((onChange) => ({
    onChange: { onChange },
    width: '10ch',
    height: '35px',
    
    '& .MuiOutlinedInput-root': {
        height: '100%',
    },
    '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
        fontSize: '0.75rem',
    },
    '& .MuiInputAdornment-root': {
        height: '25px',
    },
}));

export default AmountTextField;