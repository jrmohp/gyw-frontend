import { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { BACKEND_BASE_URL } from 'src/config';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


export const AccountDetailsStep = ({ selectedCategory,onValidationComplete, ...props }) => {
  const { onBack, onNext, ...other } = props;
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2022-09-22T11:41:50'));
  const [endDate, setEndDate] = useState(new Date('2023-01-11T12:41:50'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('Click Validate to Check Credentials & Move to Next Step.');
  const [LOGIN_URL, setLOGIN_URL] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [errormessage, setErrorMessage] = useState(null);
  const [standardResponseData, setStandardResponseData] = useState({});

  console.log({selectedCategory});


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResponseData=(data)=>{

    console.log("INPUT_DATA-"+data.sPhoneNo);
    if(selectedCategory=='ticker-tape')
    {
      const tickerData={
        client_id:data.nPAN,
        client_name: data.sClientName,
        email_id:data.sEmailId,
        phone_no:data.sPhoneNo,
        client_password:password
      };

      return tickerData;
      console.log(standardResponseData);
    }
  }


  const handleValidate = async () => {
    try {

      if(selectedCategory=='ticker-tape')
      {
        setLOGIN_URL(`${BACKEND_BASE_URL}/api/mutualfund/login/tickerwealth/`);
      }
      else {
        setMessage("Only Ticker is Available for Integration. Please Check Back Later.")
        return;
      }
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

  return (
    <Stack spacing={3}
           {...other}>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="User Name"
          name="username"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/*<TextField*/}
        {/*  fullWidth*/}
        {/*  type="password"*/}
        {/*  InputProps={{*/}
        {/*    endAdornment: (*/}
        {/*      <InputAdornment position="end">*/}
        {/*        <Button*/}
        {/*          color="inherit"*/}
        {/*          sx={{ ml: 2 }}*/}
        {/*          onClick={handleValidate}*/}
        {/*        >*/}
        {/*          Validate*/}
        {/*        </Button>*/}
        {/*      </InputAdornment>*/}
        {/*    ),*/}
        {/*  }}*/}
        {/*  label="Password"*/}
        {/*  name="password"*/}
        {/*  value={password}*/}
        {/*  onChange={(e) => setPassword(e.target.value)}*/}
        {/*/>*/}

        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <Button
                  color="inherit"
                  sx={{ ml: 2 }}
                  onClick={handleValidate}
                >
                  Validate
                </Button>
              </InputAdornment>
            ),
          }}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Typography color="info">{message}</Typography>
      <Typography color="error">{errormessage}</Typography>
      <Stack alignItems="center"
             direction="row"
             spacing={2}>

        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
          disabled={!isValidated}
        >
          Continue
        </Button>
        <Button color="inherit"
                onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

AccountDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
