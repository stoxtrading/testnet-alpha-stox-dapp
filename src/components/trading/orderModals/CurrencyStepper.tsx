import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import {  SubtitleTypography } from '../../../assets/elements/CustomTypography';

const steps = ["USDT", "STOX", "USDC"];

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({  ownerState }) => ({
  backgroundColor: 'white',
  zIndex: 1,
  color: '#fff',
  width: 12,
  height: 12,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:"-0.8em",
  boxShadow: ownerState.active ? '0 4px 10px 0 rgba(0,0,0,.25)' : 'none',
  transition: 'background-color 0.2s, box-shadow 0.2s',
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient(90deg, #FF3BFF,rgb(223, 147, 220),rgb(233, 142, 233))',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
  ],
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 5,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'white',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'white',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor: theme.palette.grey[400],
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;



  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      
    </ColorlibStepIconRoot>
  );
}

export default function CurrencyStepper() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            onClick={handleStep(index)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <SubtitleTypography fontSize='0.8em'>{label}</SubtitleTypography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}