import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import './CommonPageBackground.css';
import CssBaseline from "@mui/material/CssBaseline";

interface CommonPageBackgroundProps {

    children: React.ReactNode;

}
const CommonPageBackground: React.FC<CommonPageBackgroundProps> = ({ children }) => (

 
        <div className='pageSurroundingArea'>
            <CssBaseline/>

            <Container sx={{ marginTop: '90px' }} >
                <Box className='innerBoxArea' sx={{ flexGrow: 1, padding: '20px', borderRadius: '8px' }}>
                {children}

                </Box>
            </Container>
        </div>

);

export default CommonPageBackground;