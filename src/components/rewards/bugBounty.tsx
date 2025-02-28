import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const BugBounty: React.FC = () => {
  const rewardStructure = [
    { severity: 'Critical (CVSS 9.0-10.0)', reward: '$20,000 - $50,000', examples: 'Smart contract exploits, remote code execution, major financial loss risks' },
    { severity: 'High (CVSS 7.0-8.9)', reward: '$5,000 - $20,000', examples: 'Unauthorized token minting, severe API security flaws, access to private user data' },
    { severity: 'Medium (CVSS 4.0-6.9)', reward: '$1,000 - $5,000', examples: 'Broken authentication, price oracle manipulation, logic bugs affecting order book' },
    { severity: 'Low (CVSS 1.0-3.9)', reward: '$250 - $1,000', examples: 'Minor UI/UX issues leading to misinformation, gas inefficiencies' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        STOX Trading Bug Bounty Program
      </Typography>
      
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Overview
        </Typography>
        <Typography variant="body1" paragraph>
          At STOX Trading, we prioritize the security of our decentralized limit order book platform for tokenized equities. 
          Our bug bounty program rewards security researchers who identify vulnerabilities in our smart contracts, API, or front-end application.
        </Typography>
        <Typography variant="body1" paragraph>
          We're particularly interested in issues affecting the core components of our ecosystem:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Box component="li"><Typography>STOX Token contract (ERC-20)</Typography></Box>
          <Box component="li"><Typography>Security Token contract (Tokenized NVDA shares)</Typography></Box>
          <Box component="li"><Typography>Decentralized Limit Order Book smart contract</Typography></Box>
          <Box component="li"><Typography>Automated Market-Making Service</Typography></Box>
          <Box component="li"><Typography>Front-end application and API endpoints</Typography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Reward Structure
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Reward Range</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Examples</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardStructure.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' } }}>
                  <TableCell>{row.severity}</TableCell>
                  <TableCell>{row.reward}</TableCell>
                  <TableCell>{row.examples}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Focus Areas
        </Typography>
        <Typography variant="body1" paragraph>
          We are especially interested in vulnerabilities related to:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Box component="li"><Typography><strong>Order Book Logic:</strong> Issues with order matching, price-time priority, or trade execution</Typography></Box>
          <Box component="li"><Typography><strong>Smart Contract Security:</strong> Reentrancy, integer overflow/underflow, front-running opportunities</Typography></Box>
          <Box component="li"><Typography><strong>Asset Security:</strong> Unauthorized withdrawal of STOX tokens or security tokens, token creation exploits</Typography></Box>
          <Box component="li"><Typography><strong>Price Manipulation:</strong> Attacks on AMM price feeds or oracle manipulation</Typography></Box>
          <Box component="li"><Typography><strong>Access Control:</strong> Privilege escalation or unauthorized admin access</Typography></Box>
          <Box component="li"><Typography><strong>Linked List Implementation:</strong> Vulnerabilities in the order book's hybrid data structure</Typography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Submission Process
        </Typography>
        <Typography variant="body1" paragraph>
          To report a vulnerability:
        </Typography>
        <Box component="ol" sx={{ pl: 4 }}>
          <Box component="li"><Typography>Submit detailed reports to security@stoxtrading.com</Typography></Box>
          <Box component="li"><Typography>Include clear steps to reproduce the issue</Typography></Box>
          <Box component="li"><Typography>Provide impact assessment and potential mitigation strategies</Typography></Box>
          <Box component="li"><Typography>Our security team will respond within 48 hours to acknowledge receipt</Typography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Contract Addresses (BASE Sepolia Testnet)
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Contract</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>STOX Token</TableCell>
                <TableCell>0xF27a9024Cf252D31705CeF15a6581F2e0aa7d8F7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NVIDIA Security Token</TableCell>
                <TableCell>0x519e792F311253907E7151448B74A02344597CCf</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Limit Order Book</TableCell>
                <TableCell>0xb26b9a31CCDA28482CeC40a594AAbdC1587c2520</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mock USDT</TableCell>
                <TableCell>0xE5CFC9a03248ec13ae13788b66b7489d5339Bf89</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Uniswap V3 Pool (STOX/USDT)</TableCell>
                <TableCell>0xDA7FeB22c7701c4DFc05bF34F27AfD122dcd49e2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          Participation in our bug bounty program requires adherence to the following terms:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Box component="li"><Typography>Do not disclose any vulnerability to the public before it has been fixed</Typography></Box>
          <Box component="li"><Typography>Do not attempt to exploit vulnerabilities beyond what's necessary to demonstrate the issue</Typography></Box>
          <Box component="li"><Typography>Do not use automated scanners on production systems without prior approval</Typography></Box>
          <Box component="li"><Typography>Do not violate any laws or compromise user data</Typography></Box>
          <Box component="li"><Typography>Final reward amounts are determined at STOX Trading's discretion based on severity and impact</Typography></Box>
        </Box>
      </Box>
    </Container>
  );
}

export { BugBounty };