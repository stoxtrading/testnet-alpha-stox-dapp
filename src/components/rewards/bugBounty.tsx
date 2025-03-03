import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Link } from '@mui/material';
import { ClickableTxHashTypography, GenericTypography } from '../../assets/elements/CustomTypography';
import { nvidiaOrderBookContractConfig } from '../../assets/contracts/dev/NvidiaOrderBook';
import { nvidiaContractConfig } from '../../assets/contracts/dev/Nvidia';
import { stoxContractConfig } from '../../assets/contracts/dev/Stox';
import { mockUsdtContractConfig } from '../../assets/contracts/dev/MockUsdt';

const BugBounty: React.FC = () => {
  const rewardStructure = [
    { severity: 'Critical (CVSS 9.0-10.0)', reward: '$2,500 - $10,000', examples: 'Smart contract exploits, remote code execution, major financial loss risks' },
    { severity: 'High (CVSS 7.0-8.9)', reward: '$1,000 - $2,500', examples: 'Unauthorized token minting, severe API security flaws, access to private user data' },
    { severity: 'Medium (CVSS 4.0-6.9)', reward: '$250 - $1,000', examples: 'Broken authentication, price oracle manipulation, logic bugs affecting order book' },
    { severity: 'Low (CVSS 1.0-3.9)', reward: '$50 - $250', examples: 'Minor UI/UX issues leading to misinformation, gas inefficiencies' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} id='bug-bounty-rewards'>
      <GenericTypography usage='title' fontSize="2.2rem" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        BUG BOUNTY PROGRAM
      </GenericTypography>

      <Box sx={{ mb: 5 }}>
        <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Overview
        </GenericTypography>
        <GenericTypography >
          At STOX Trading, we prioritize the security of our decentralized limit order book platform for tokenized equities.
          Our bug bounty program rewards security researchers who identify vulnerabilities in our smart contracts, API, or front-end application.
        </GenericTypography>
        <GenericTypography>
          We're particularly interested in issues affecting the core components of our ecosystem:
        </GenericTypography>
        <Box component="ul" sx={{ pl: 4 }} color='white'>
          <Box component="li"><GenericTypography>STOX Token contract (ERC-20)</GenericTypography></Box>
          <Box component="li"><GenericTypography>Security Token contract (Tokenized NVDA shares)</GenericTypography></Box>
          <Box component="li"><GenericTypography>Decentralized Limit Order Book smart contract</GenericTypography></Box>
          <Box component="li"><GenericTypography>Automated Market-Making Service</GenericTypography></Box>
          <Box component="li"><GenericTypography>Front-end application and API endpoints</GenericTypography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Reward Structure
        </GenericTypography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}><GenericTypography color='black' fontWeight={600} fontSize='1rem'>SEVERITY</GenericTypography></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}><GenericTypography color='black' fontWeight={600} fontSize='1rem'>REWARD RANGE</GenericTypography></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}><GenericTypography color='black' fontWeight={600} fontSize='1rem'>EXAMPLES</GenericTypography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardStructure.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' } }}>
                  <TableCell><GenericTypography color='black' fontSize='1rem'>{row.severity}</GenericTypography></TableCell>
                  <TableCell><GenericTypography color='black' fontSize='1rem'>{row.reward}</GenericTypography></TableCell>
                  <TableCell><GenericTypography color='black' fontSize='1rem'>{row.examples}</GenericTypography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mb: 5 }}>
        <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Focus Areas
        </GenericTypography>
        <GenericTypography>
          We are especially interested in vulnerabilities related to:
        </GenericTypography>
        <Box component="ul" sx={{ pl: 4 }} color='white'>
          <Box component="li"><GenericTypography>Order Book Logic: Issues with order matching, price-time priority, or trade execution</GenericTypography></Box>
          <Box component="li"><GenericTypography>Smart Contract Security: Reentrancy, integer overflow/underflow, front-running opportunities</GenericTypography></Box>
          <Box component="li"><GenericTypography>Asset Security: Unauthorized withdrawal of STOX tokens or security tokens, token creation exploits</GenericTypography></Box>
          <Box component="li"><GenericTypography>Price Manipulation: Attacks on AMM price feeds or oracle manipulation</GenericTypography></Box>
          <Box component="li"><GenericTypography>Access Control: Privilege escalation or unauthorized admin access</GenericTypography></Box>
          <Box component="li"><GenericTypography>Linked List Implementation: Vulnerabilities in the order book's hybrid data structure</GenericTypography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Submission Process
        </GenericTypography>
        <GenericTypography>
          To report a vulnerability:
        </GenericTypography>
        <Box component="ol" sx={{ pl: 4 }} color='white'>
          <Box component="li"><GenericTypography>Submit detailed reports to security@stoxtrading.com</GenericTypography></Box>
          <Box component="li"><GenericTypography>Include clear steps to reproduce the issue</GenericTypography></Box>
          <Box component="li"><GenericTypography>Provide impact assessment and potential mitigation strategies</GenericTypography></Box>
          <Box component="li"><GenericTypography>Our security team will respond within 48 hours to acknowledge receipt</GenericTypography></Box>
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Contract Addresses (BASE Sepolia Testnet)
        </GenericTypography>
        <TableContainer component={Paper} elevation={3}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}><GenericTypography color='black' fontWeight={600} fontSize='1rem'>CONTRACT</GenericTypography></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}><GenericTypography color='black' fontWeight={600} fontSize='1rem'>ADDRESS</GenericTypography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><GenericTypography color='black' fontSize='1rem'>STOX Token</GenericTypography></TableCell>
                <TableCell><Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${stoxContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <ClickableTxHashTypography sx={{color:'black'}}>{stoxContractConfig.address}</ClickableTxHashTypography>
                </Link></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><GenericTypography color='black' fontSize='1rem'>NVIDIA Security Token</GenericTypography></TableCell>
                <TableCell><Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <ClickableTxHashTypography sx={{color:'black'}}>{nvidiaContractConfig.address}</ClickableTxHashTypography>
                </Link></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><GenericTypography color='black' fontSize='1rem'>Limit Order Book</GenericTypography></TableCell>
                <TableCell><Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${nvidiaOrderBookContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <ClickableTxHashTypography sx={{color:'black'}}>{nvidiaOrderBookContractConfig.address}</ClickableTxHashTypography>
                </Link></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><GenericTypography color='black' fontSize='1rem'>Mock USDT</GenericTypography></TableCell>
                <TableCell><Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${mockUsdtContractConfig.address}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <ClickableTxHashTypography sx={{color:'black'}}>{mockUsdtContractConfig.address}</ClickableTxHashTypography>
                </Link></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><GenericTypography color='black' fontSize='1rem'>Uniswap V3 Pool (STOX/USDT)</GenericTypography></TableCell>
                <TableCell> <Link href={`${import.meta.env.VITE_APP_BLOCKSCOUT_ENDPOINT}/address/${import.meta.env.VITE_APP_POOL_ADDRESS}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                  <ClickableTxHashTypography sx={{color:'black'}}>{import.meta.env.VITE_APP_POOL_ADDRESS}</ClickableTxHashTypography>
                </Link></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
      <GenericTypography usage='subTitle' fontSize="1.8rem" gutterBottom sx={{ fontWeight: 'bold' }}>
          Terms and Conditions
        </GenericTypography>
        <GenericTypography variant="body1" paragraph>
          Participation in our bug bounty program requires adherence to the following terms:
        </GenericTypography>
        <Box component="ul" sx={{ pl: 4 }} color='white'>
          <Box component="li"><GenericTypography>Do not disclose any vulnerability to the public before it has been fixed</GenericTypography></Box>
          <Box component="li"><GenericTypography>Do not attempt to exploit vulnerabilities beyond what's necessary to demonstrate the issue</GenericTypography></Box>
          <Box component="li"><GenericTypography>Do not use automated scanners on production systems without prior approval</GenericTypography></Box>
          <Box component="li"><GenericTypography>Do not violate any laws or compromise user data</GenericTypography></Box>
          <Box component="li"><GenericTypography>Final reward amounts are determined at STOX Trading's discretion based on severity and impact</GenericTypography></Box>
        </Box>
      </Box>
    </Container>
  );
}

export { BugBounty };