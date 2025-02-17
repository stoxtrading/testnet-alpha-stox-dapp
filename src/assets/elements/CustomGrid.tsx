import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

const GridAsksNb = styled(Grid)(() => ({
  borderRadius: 0,
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksAddr = styled(Grid)(() => ({
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  backgroundColor: '#FFFFFF',
  textAlign: 'left',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,
  paddingLeft: 6,
}));

const GridQty = styled(Grid)(() => ({
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  color: '#1e163b',
  alignContent: 'center',
  height: 28,

}));

const GridAsksHeader = styled(Grid)(() => ({
  borderRadius: 0,
  textAlign: 'center',
  color: '#1e163b',
  paddingLeft: 2,
  height: 30,
  alignContent: 'center',
}));


export { GridAsksNb, GridAsksAddr, GridQty, GridAsksHeader };