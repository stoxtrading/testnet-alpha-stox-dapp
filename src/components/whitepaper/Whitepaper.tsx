import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ButtonTypography } from '../../assets/elements/CustomTypography';

export default function Whitepaper() {
    const whitePaperUrl = "https://stox-whitepaper.s3.eu-west-1.amazonaws.com/stox_whitepaper.pdf"
    return (
        <Grid>
            <Grid display={{ xs: 'none', sm: 'flex', }}>
                <iframe
                    src={whitePaperUrl}
                    width="800"
                    height="800"
                    style={{ border: 'none' }}
                    title="Whitepaper"
                />
            </Grid>
            <Grid display={{ xs: 'flex', sm: 'none', }}>
                <Button
                    variant="contained"
                    color="primary"
                    href={whitePaperUrl}
                    download
                >
                    <ButtonTypography color="white">Download Whitepaper</ButtonTypography>

                </Button>

            </Grid>
        </Grid>

    )
}