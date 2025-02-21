import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

const GridAsksNb = styled(Grid)(() => ({
  borderRadius: 0,
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',

}));

const GridAsksAddr = styled(Grid)(() => ({
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  
  textAlign: 'left',
  color: '#1e163b',
  alignContent: 'center',
  paddingLeft: 6,
}));

const GridQty = styled(Grid)(() => ({
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',

}));

const GridAsksHeader = styled(Grid)(() => ({
  borderRadius: 0,
  textAlign: 'center',
  color: '#1e163b',
  paddingLeft: 2,
  alignContent: 'center',
}));


const GridAction = styled(Grid)(() => ({
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  textAlign: 'center',
 
  alignContent: 'center',
  height: 28,
}));

const GridBidsNb = styled(Grid)(() => ({
  borderRadius: 0,
  textAlign: 'center',
  color: '#27AE60',
  alignContent: 'center',
}));

const GridBidsAddr = styled(Grid)(() => ({
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  textAlign: 'left',
  color: '#27AE60',
  alignContent: 'center',
  
  paddingLeft: 6,
  wordBreak: 'break-all',
  fontWeight: 'bold',
  cursor: 'pointer',

}));

export { GridAsksNb, GridAsksAddr, GridQty, GridAsksHeader,GridAction, GridBidsNb, GridBidsAddr };