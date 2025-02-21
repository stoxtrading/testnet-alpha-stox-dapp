import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import './CommonPageBackground.css';

interface CommonPageBackgroundProps {

    children: React.ReactNode;

}
const CommonPageBackground: React.FC<CommonPageBackgroundProps> = ({ children }) => (


    <div className='pageSurroundingArea'
        style={{
            display: 'flex',
            justifyContent: 'center',
            
            minHeight: '100vh',
            
        }}
    >
        <CssBaseline />

        <Container >
            <Box className='innerBoxArea' sx={{ flexGrow: 1, padding: '20px', borderRadius: '8px' }}>
                {children}

            </Box>
        </Container>
    </div>

);

export default CommonPageBackground;