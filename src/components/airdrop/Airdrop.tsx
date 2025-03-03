import { useState, useEffect } from 'react';
import { Stack, TextField, Button, Alert, Snackbar, Typography, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { SocialMediaBar } from '../countDown/SocialMediaBar';
import { PoweredByBar } from '../countDown/PoweredByBar';


interface AirdropFormData {
  address: string;
  email?: string;
  name?: string;
}

export default function Airdrop() {
  const [formData, setFormData] = useState<AirdropFormData>({
    address: '',
    email: '',
    name: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address) {
      setSnackbar({
        open: true,
        message: 'Wallet address is required',
        severity: 'error',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // API call to Lambda function
      const response = await fetch('YOUR_API_GATEWAY_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Successfully registered for the airdrop!',
          severity: 'success',
        });
        
        // Reset form after successful submission
        setFormData({
          address: '',
          email: '',
          name: '',
        });
      } else {
        throw new Error(result.message || 'Failed to register');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'An error occurred',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Stack rowGap={5} alignItems={'center'} paddingTop="5vh">
      <Grid container justifyContent="center" spacing={2} direction={'column'} alignItems={"center"}>
        <Grid container justifyContent="center" display={{ xs: 'flex', sm: 'none' }} alignItems={"center"}>
          <HomePageAnnoucementTypography sx={{ fontSize: '2.4rem' }} marginRight='-1rem'>
            STOX
          </HomePageAnnoucementTypography>
        </Grid>
        <Grid container justifyContent="center" direction={"column"}>
          <HomePageAnnoucementTypography sx={{ fontSize: '1.9rem' }}>
            AIRDROP
          </HomePageAnnoucementTypography>
        </Grid>
        <Grid container justifyContent="center" direction={"column"}>
          <HomePageAnnoucementTypography sx={{ fontSize: '1rem' }}>
            REGISTER NOW
          </HomePageAnnoucementTypography>
        </Grid>
      </Grid>

      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          width: '100%', 
          maxWidth: 500, 
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              required
              label="Wallet Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter your wallet address"
              InputLabelProps={{
                sx: { color: 'text.secondary' }
              }}
            />
            
            <TextField
              fullWidth
              label="Email (Optional)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter your email"
              InputLabelProps={{
                sx: { color: 'text.secondary' }
              }}
            />
            
            <TextField
              fullWidth
              label="Name (Optional)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              placeholder="Enter your name"
              InputLabelProps={{
                sx: { color: 'text.secondary' }
              }}
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              disabled={isSubmitting}
              sx={{ 
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold', 
                letterSpacing: '1px',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'REGISTER FOR AIRDROP'}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
          Register your wallet address to be eligible for the upcoming STOX token airdrop.
          Early participants will receive bonus tokens.
        </Typography>
      </Box>

      <SocialMediaBar />
      <PoweredByBar />

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}