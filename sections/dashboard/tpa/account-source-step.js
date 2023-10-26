// AccountSourceStep.js

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const categoryOptions = [
  {
    description: 'Manage your Mutual Funds.',
    title: 'Ticker Tape',
    value: 'ticker-tape',
  },
  {
    description: 'Manage your Stocks',
    title: 'ABML',
    value: 'abml',
  },
  {
    description: 'Other Options',
    title: 'Other',
    value: 'others',
  },
];

export const AccountSourceStep = (props) => {
  const { onBack, onNext, onCategorySelect, ...other } = props;
  const [category, setCategory] = useState(categoryOptions[0].value);

  const handleCategoryChange = useCallback(
    (value) => {
      setCategory(value);
      onCategorySelect(value);
    },
    [onCategorySelect]
  );

  return (
    <Stack
      spacing={3}
           {...other}>
      <div>
        <Typography variant="h6">Link my existing account of..</Typography>
      </div>
      <Stack
        spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(category === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleCategoryChange(option.value)}
            variant="outlined"
          >
            <Stack direction="row"
                   spacing={2}>
              <Radio checked={category === option.value}
                     color="primary" />
              <div>
                <Typography
                  variant="subtitle1">{option.title}</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2">
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      <div>
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
      </div>
    </Stack>
  );
};

AccountSourceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onCategorySelect: PropTypes.func,
};
