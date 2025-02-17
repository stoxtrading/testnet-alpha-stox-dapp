import { styled } from '@mui/material/styles';
import { TypographyProps, Typography } from '@mui/material';


const SubSectionTitleTypography = styled(Typography)<TypographyProps>(() => ({
    variant: "caption"

}));


const SingleComponentStackTitleTypography: React.FC<TypographyProps> = ({ children, ...props }) => {
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

const HeaderMenuTypography: React.FC<TypographyProps> = (props,) => {
    return (
        <Typography
        color='#1e163b'
            {...props}
            
            sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 700,
                fontFamily: 'Michroma',
                fontSize: '0.9rem',

                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};

const TableTitleTypography: React.FC<TypographyProps> = (props) => {
    return (
        <Typography
            {...props}
            color='#1e163b'
            sx={{
                fontWeight: 500,
                fontFamily: 'Michroma',
                fontSize: '0.7rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};

interface NumbersTypographyProps extends TypographyProps {
    color?: string;
}

const NumbersTypography: React.FC<NumbersTypographyProps> = ( {color = '#1e163b', ...props}) => {
    return (
        <Typography
            {...props}
            color={color}
            sx={{
                letterSpacing: '0.1em',
                fontWeight: 500,
                fontFamily: 'Michroma',
                fontSize: '0.6rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};

const ClickableTxHashTypography: React.FC<TypographyProps> = (props) => {
    return (
        <Typography
            {...props}
            color='#1e163b'
            sx={{
                 wordBreak: 'break-all', cursor: 'pointer',
                '&:hover': {
                    color: '#3f51b5',
                    textDecoration: 'underline',
                },
                fontWeight: 700,
                fontFamily: 'Michroma',
                fontSize: '0.6rem',
                letterSpacing: '0.05em',

                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};
interface ClickableAddressTypographyProps extends TypographyProps {
    color?: string;
}

const ClickableAddressTypography: React.FC<ClickableAddressTypographyProps> = ({ children, color = '#1e163b', ...props }) => {
    return (
        <Typography
            {...props}
            color={color}
            sx={{
                 wordBreak: 'break-all', cursor: 'pointer',
                '&:hover': {
                    color: '#3f51b5',
                    textDecoration: 'underline',
                },
                fontFamily: 'Michroma',
                fontSize: '0.6rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {children}
        </Typography>
    );
};


interface SubtitleTypographyProps extends TypographyProps {
    color?: string;
}

const SubtitleTypography: React.FC<SubtitleTypographyProps> = ( {color = '#3f51b5', ...props}) => {
    return (
        <Typography
            {...props}
            
            color={color}
            sx={{
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'Michroma',
                fontSize: '0.7rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};


interface ButtonTypographyProps extends TypographyProps {
    color?: string;
}

const ButtonTypography: React.FC<ButtonTypographyProps> = ( {color = '#1e163b', ...props}) => {
    return (
        <Typography
            {...props}
            
            color={color}
            sx={{
                textTransform: 'uppercase',
                fontWeight: 900,
                fontFamily: 'Michroma',
                fontSize: '0.5rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
};


interface HomePageAnnoucementTypographyProps extends TypographyProps {
    color?: string;
}

const HomePageAnnoucementTypography: React.FC<HomePageAnnoucementTypographyProps> = ( {color = '#ffff', ...props}) => {
    return (
        <Typography
            {...props}
            variant='h3'
            color={color}
            sx={{
                wordBreak: 'break-word',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'Michroma',
                ...props.sx, // Allow overriding styles
                letterSpacing: '0.1em',
            }}
        >
            {props.children}
        </Typography>
    );
};

interface CountdownNumbersTypographyProps extends TypographyProps {
    color?: string;
}

const CountdownNumbersTypography: React.FC<CountdownNumbersTypographyProps> = ( {color = '#ffff', ...props}) => {
    return (
        <Typography
            {...props}
            
            color={color}
            sx={{
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'Michroma',
                ...props.sx, // Allow overriding styles
                letterSpacing: '0.1em',
                fontSize: '1.2rem',

            }}
        >
            {props.children}
        </Typography>
    );
};

export { SubSectionTitleTypography };
export { SingleComponentStackTitleTypography };
export { HeaderMenuTypography };
export { TableTitleTypography };
export { NumbersTypography }
export { ClickableTxHashTypography }
export { ClickableAddressTypography }
export { SubtitleTypography }
export {ButtonTypography}
export {HomePageAnnoucementTypography}
export {CountdownNumbersTypography}