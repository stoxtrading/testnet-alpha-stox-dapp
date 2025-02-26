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
            backgroundImage: 'url(./welcome-page-bg.png)',
            backgroundSize: '100% auto', // Cover horizontally, not vertically
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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


interface SimplePageBackgroundProps {
    children: React.ReactNode;
}
const SimplePageBackground: React.FC<SimplePageBackgroundProps> = ({ children }) => (
    <div className='simplePageSurroundingArea'
        style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: 'url(./misc-page-bg.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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

export  {CommonPageBackground, SimplePageBackground};