// src/sections/dashboard/account-linking/account-linking-form.js

import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/router';

// You might need to create or modify these components based on your requirements
import { AccountSourceStep } from './account-source-step';
import { AccountDetailsStep } from './account-details-step';
import { AccountPreview } from './account-preview';
import {BACKEND_BASE_URL} from "../../../config";

const StepIcon = (props) => {
  const { active, completed, icon } = props;
  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }),
      }}
      variant="rounded"
    >
      {completed ? (
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      ) : (
        icon
      )}
    </Avatar>
  );
};

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};

export const AccountLinkingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ticker-tape');
  const [resultData, setResultData] = useState(null);
  const [ADD_ACCOUNT_URL, setADD_ACCOUNT_URL] = useState('');
  const [open, setOpen] = React.useState(false);
  const router = useRouter();


  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, [selectedCategory]);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, [selectedCategory,resultData]);

  const handleComplete = useCallback(async () => {
    setIsComplete(true);
    const accessToken = sessionStorage.getItem("accessToken");
    const response = await fetch(`${BACKEND_BASE_URL}/api/mutualfund/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Add the access token as a Bearer token
      },
      body: JSON.stringify(resultData),
    });

    const data = await response.json();
    console.log(response.status);
    console.log(data);

    if (response.status === 201) {
      // Redirect to a specific page
      alert("ACCOUNT ADDED SUCCESSFULLY");
      router.push("/linkedAccounts");
      // Update with your specific path
    }

  }, [resultData]);



  const handleCategorySelection = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleValidationResult = (result) => {
    setResultData(result);  // Update the resultData state with the API result
    console.log("Validation result: ", result);  // You can remove this line later
  };

  const handleValidate = async () => {
    try {


      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(response.status);

      if(response.status==200)
      {
        setIsValidated(true);
        setMessage("Credentials Validated.");
        setErrorMessage('');
        onValidationComplete(handleResponseData(data.Results));
        console.log(data);

      }
      else
      {
        setErrorMessage(data.Status || 'Unknown response');
      }

    } catch (error) {
      console.log(error);
      setErrorMessage('Error occurred while validating.Try Again!');
    }
  };



  const steps = useMemo(() => {
    return [
      {
        label: 'Account Source',
        content: (
          <AccountSourceStep
            onBack={handleBack}
            onNext={handleNext}
            onCategorySelect={handleCategorySelection}

          />
        ),
      },
      {
        label: 'Account Details',
        content: (
          <AccountDetailsStep
            selectedCategory={selectedCategory}
            onBack={handleBack}
            onNext={handleNext}
            onValidationComplete={handleValidationResult}

          />
        ),
      },
      {
        label: 'Account Details Preview',
        content: (
          <AccountPreview
            onBack={handleBack}
            onNext={handleComplete}
            data={resultData}
          />
        ),
      },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return  <AccountPreview
      onBack={handleBack}
      onNext={handleComplete}
      data={resultData}
    />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-line': {
          borderLeftColor: 'divider',
          borderLeftWidth: 2,
          ml: 1,
        },
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography
                sx={{ ml: 2 }}
                variant="overline"
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                borderLeftColor: 'divider',
                borderLeftWidth: 2,
                ml: '20px',
                ...(isCurrentStep && {
                  py: 4,
                }),
              }}
            >
              {step.content}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default AccountLinkingForm;
