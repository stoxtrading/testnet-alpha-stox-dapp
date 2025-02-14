import { styled } from '@mui/material/styles';
import {  TypographyProps, Typography } from '@mui/material';


const SubSectionTitleTypography = styled(Typography)<TypographyProps>(() => ({
    variant:"caption"
    
}));


interface CustomTypographyProps extends TypographyProps {
    // Add any additional props if needed
}

const SingleComponentStackTitleTypography: React.FC<CustomTypographyProps> = ({ children,  ...props }) => {
    return (
        <Typography
            sx={{ fontWeight: 700, fontFamily: 'Michroma', letterSpacing: '0.2em' }} 
            color='#1e163b' 
            variant="overline"
            {...props}
        >
            {children}
        </Typography>
    );
};


export { SubSectionTitleTypography };
export { SingleComponentStackTitleTypography };