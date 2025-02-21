import { Box } from "@mui/material"

import { HeaderMenuTypography, } from '../../assets/elements/CustomTypography';


interface WalletButtonProps {
    text: string;
    onClick: () => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({ text, onClick }) => {
    
    return (
        <Box

            borderRadius="6px"
            onClick={onClick}
            sx={{
                borderRadius: "100px",
                position: 'relative',
                background: "#000",
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    padding: '2px',
                    borderRadius: '100px',
                    background: 'linear-gradient(90deg, #FF3BFF, #ECBFBF, #5C24FF, #D94FD5, #FF3BFF)',
                    backgroundSize: '200% 100%',
                    animation: 'gradientMove 3s linear infinite',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                },
                '@keyframes gradientMove': {
                    '0%': {
                        backgroundPosition: '0% 0%',
                    },
                    '100%': {
                        backgroundPosition: '200% 0%',
                    }
                },
                transition: 'all 0.1s ease-in-out',
                '&:hover': {

                    cursor: 'pointer',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.05)',
                },
                paddingTop: "8px",
                paddingBottom: "5px",
            }}>
            <HeaderMenuTypography
                paddingLeft="12px"
                paddingRight="12px"
                color="white"
                sx={{
                    fontSize: "0.6rem",
                }}>{text}
            </HeaderMenuTypography>
        </Box>
    )
}

export {WalletButton}