import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

interface CommonPageBackgroundProps {

    children: React.ReactNode;

}
const CommonPageBackground: React.FC<CommonPageBackgroundProps> = ({ children }) => (


    <div className='pageSurroundingArea'
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: 'url(./upscale-1.jpg)',
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