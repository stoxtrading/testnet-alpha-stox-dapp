import React from 'react';
import Grid from '@mui/material/Grid2';
import { SingleComponentStackTitleTypography } from '../../assets/elements/CustomTypography';

interface StackTitleProps {
    title: string;
}

const StackTitle: React.FC<StackTitleProps> = ({ title }) => {
    return (
        <Grid container sx={{ marginBottom: 0.1, marginTop: -2.5, marginLeft: -1 }}>
            <Grid container columnGap={1}>
                <Grid>
                    <SingleComponentStackTitleTypography>{title}</SingleComponentStackTitleTypography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StackTitle;