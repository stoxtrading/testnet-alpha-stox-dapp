import { styled } from '@mui/material/styles';
import { TypographyProps, Typography } from '@mui/material';


interface GenericTypographyProps extends TypographyProps {
    color?: string;
    fontSize?: string;
}

const GenericTypography: React.FC<GenericTypographyProps> = ({ color = 'white',fontSize = '0.7rem', ...props }) => {
    return (
        <Typography
            {...props}

            color={color}
            sx={{
                
                fontWeight: 300,
                fontFamily: 'Michroma',
                fontSize: {fontSize},
                ...props.sx, // Allow overriding styles
            }}
        >
            {props.children}
        </Typography>
    );
}

const SubSectionTitleTypography = styled(Typography)<TypographyProps>(() => ({
    variant: "caption",
    color: 'white',

}));


const SingleComponentStackTitleTypography: React.FC<TypographyProps> = ({ children, ...props }) => {
    return (
        <Typography
            sx={{ fontWeight: 700, fontFamily: 'Michroma', letterSpacing: '0.2em' }}
            color='#E6D3E6'
            variant="overline"
            {...props}
        >
            {children}
        </Typography>
    );
};




interface HeaderMenuTypographyProps extends TypographyProps {
    color?: string;
}

const HeaderMenuTypography: React.FC<HeaderMenuTypographyProps> = ({ color = '#1e163b', ...props }) => {
    return (
        <Typography
            color={color}
            {...props}
variant='subtitle1'
            sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
                fontFamily: 'Michroma',
                fontSize: '0.7rem',

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
            
            color='white'
            sx={{
                fontWeight: 500,
                fontFamily: 'Michroma',
                fontSize: '0.7rem',
                ...props.sx, // Allow overriding styles
            }}
            {...props}
        >
            {props.children}
        </Typography>
    );
};

interface NumbersTypographyProps extends TypographyProps {
    color?: string;
    fontSize?: string;
}

const NumbersTypography: React.FC<NumbersTypographyProps> = ({fontSize='0.7rem', color = 'white', ...props }) => {
    return (
        <Typography
            {...props}
            color={color}
            sx={{
                letterSpacing: '0.1em',
                fontWeight: 400,
                fontFamily: 'Rubik',
                fontSize:{fontSize},
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
            color='white'
            sx={{
                wordBreak: 'break-all', cursor: 'pointer',
                '&:hover': {
                    color: 'white',
                    textDecoration: 'underline',
                },
                fontWeight: 300,
                fontFamily: 'Rubik',
                fontSize: '0.8rem',
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

const ClickableAddressTypography: React.FC<ClickableAddressTypographyProps> = ({ children, color = 'white', ...props }) => {
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
                fontFamily: 'Rubik',
                fontSize: '0.8rem',
                ...props.sx, // Allow overriding styles
            }}
        >
            {children}
        </Typography>
    );
};


interface SubtitleTypographyProps extends TypographyProps {
    color?: string;
    fontSize?: string;
}

const SubtitleTypography: React.FC<SubtitleTypographyProps> = ({ color = 'white',fontSize = '0.7rem', ...props }) => {
    return (
        <Typography
            {...props}

            color={color}
            sx={{
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'Michroma',
                fontSize: {fontSize},
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

const ButtonTypography: React.FC<ButtonTypographyProps> = ({ color = '#1e163b', ...props }) => {
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

const HomePageAnnoucementTypography: React.FC<HomePageAnnoucementTypographyProps> = ({ color = '#ffff', ...props }) => {
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

const CountdownNumbersTypography: React.FC<CountdownNumbersTypographyProps> = ({ color = '#ffff', ...props }) => {
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
                fontSize: '1.5rem',

            }}
        >
            {props.children}
        </Typography>
    );
};

interface CountdownTextTypographyProps extends TypographyProps {
    color?: string;
}

const CountdownTextTypography: React.FC<CountdownTextTypographyProps> = ({ color = '#ffff', ...props }) => {
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
                fontSize: '1rem',

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
export { ButtonTypography }
export { HomePageAnnoucementTypography }
export { CountdownNumbersTypography, CountdownTextTypography,GenericTypography }