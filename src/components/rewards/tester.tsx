import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { ButtonTypography, GenericTypography, HomePageAnnoucementTypography } from '../../assets/elements/CustomTypography';
import { Button, Container, Paper, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Card, CardContent } from '@mui/material';
import { DiscordIcon } from '../../assets/icons/DiscordIcon';
import { AirdropIcon } from "../../assets/icons/AirdropIcon";
import { CheckIcon } from '../../assets/icons/CheckIcon';
import { PreSaleIcon } from '../../assets/icons/PreSaleIcon';
import { StocksExchangeIcon } from '../../assets/icons/StocksExchangeIcon';

function Tester() {
  const steps = [
    {
      title: "Join our Discord Server",
      description: "Connect with our community and get support during testing",
      icon: <DiscordIcon />
    },
    {
      title: "Drop your address in the Faucet Channel",
      description: "Receive testnet STOX tokens, testnet BaseETH and testnet NVIDIA tokens on BASE SEPOLIA network",
      icon: <AirdropIcon />
    },
    {
      title: "Navigate to the TRADING page",
      description: "Visit https://stoxtrading.com/trading to access the order book interface",
      icon: <PreSaleIcon />
    },
    {
      title: "Start trading on the testnet",
      description: "Place limit and market orders to test the platform functionality",
      icon: <CheckIcon />
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={5}>
        {/* Header Section */}
        <Grid>
          <GenericTypography fontSize="2rem" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            TESTNET USER REWARDS PROGRAM
          </GenericTypography>
          <GenericTypography fontSize="1.5rem"   align="center"  >
            Become a tester and earn STOX tokens for helping us improve the platform
          </GenericTypography>
        </Grid>

        {/* Steps Section */}
        <Grid>

          <GenericTypography fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            How to Participate
          </GenericTypography>
          
          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid key={index} size={{xs:12, md:6}}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: 'primary.main', 
                        borderRadius: '50%', 
                        width: 36, 
                        height: 36, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        color: 'white'
                      }}>
                        {index + 1}
                      </Box>
                      <GenericTypography fontSize="1rem" color='black'>
                        {step.title}
                      </GenericTypography>
                    </Box>
                    <GenericTypography fontSize="1rem" color='black' sx={{ mb: 2 }}>
                      {step.description}
                    </GenericTypography>
                    {index === 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<DiscordIcon />}
                        fullWidth
                        sx={{
                          height: 45,
                          backgroundColor: '#5865F2',
                          '&:hover': {
                            backgroundColor: '#4752C4',
                          },
                          textTransform: 'none',
                          mt: 2
                        }}
                        component="a"
                        href="https://discord.gg/39P3FdqmXT"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ButtonTypography sx={{ color: 'white' }}>
                          Join Discord
                        </ButtonTypography>
                      </Button>
                    )}
                    {index === 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          height: 45,
                          textTransform: 'none',
                          mt: 2
                        }}
                        component="a"
                        href="https://discord.gg/39P3FdqmXT"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ButtonTypography sx={{ color: 'white' }}>
                          Get FAUCET Tokens
                        </ButtonTypography>
                      </Button>
                    )}
                    {index === 2 && (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          height: 45,
                          textTransform: 'none',
                          mt: 2
                        }}
                        component="a"
                        href="https://stoxtrading.com/trading"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ButtonTypography sx={{ color: 'white' }}>
                          Go to Trading Page
                        </ButtonTypography>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Rewards Section */}
        <Grid>
          <GenericTypography fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Reward Distribution
          </GenericTypography>
          
          <Box sx={{ mb: 4 }}>
            <GenericTypography fontSize="1.5rem"  gutterBottom sx={{ fontWeight: 'bold' }}>
              Eligibility Criteria:
            </GenericTypography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Place at least 3 orders in the Order Book" 
                  secondary="Both limit and market orders count toward this requirement"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AirdropIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Participate between March 1, 2025 and April 30, 2025" 
                  secondary="All trading activity must occur during this period to be eligible"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DiscordIcon style={{ color: '#5865F2' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Link your ETH wallet address with your Discord account" 
                  secondary="Only ETH wallet addresses associated with Discord accounts will be rewarded"
                />
              </ListItem>
            </List>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Reward Details:
            </Typography>
            <Box sx={{ 
              backgroundColor: 'rgba(25, 118, 210, 0.08)', 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(25, 118, 210, 0.2)',
            }}>
              <Typography variant="body1" paragraph>
                <strong>Top 100 active traders</strong> will receive <strong>150 STOX Mainnet tokens</strong> each as a reward for their participation and feedback.
              </Typography>
              <Typography variant="body1" paragraph>
                Rankings will be determined based on trading activity, order volume, and quality of feedback provided.
              </Typography>
              <Typography variant="body1">
                Rewards will be distributed within two weeks after the end of the testing period.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Important Notice */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: '#fffde7', border: '1px solid #fff59d' }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Important Notice:
          </Typography>
          <Typography variant="body2">
            This testnet phase is critical for ensuring the stability and security of the STOX Trading platform. Your participation helps us identify potential issues and improve the overall user experience before our mainnet launch. We appreciate your contribution to making STOX Trading a reliable platform for decentralized equity trading.
          </Typography>
        </Paper>

      </Stack>
    </Container>
  );
}

export { Tester };