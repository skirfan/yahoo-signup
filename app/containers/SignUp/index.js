import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  firstname: yup
    .string('Enter your first name')
    .required('First name is required'),
  surname: yup.string('Enter your surname').required('Surname is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: yup
    .string('Enter your mobile number')
    .required('Mobile number is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  month: yup.string('Please select month').required('Month is required'),
  day: yup.string('Please enter day').required('Day is required'),
  year: yup.string('Please enter year').required('Year is required'),
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  continue: {
    background: '#188fff',
    color: '#fff',
    border: '1px solid #188fff',
    borderRadius: '1.17647rem',
    '&:hover': {
      background: '#188fff',
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: '100%',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const formik = useFormik({
    initialValues: {
      firstname: '',
      surname: '',
      email: '',
      mobile: '',
      password: '',
      month: '',
      day: '',
      year: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const birthdate = values.day + '/' + values.month + '/' + values.year;
      var bodyFormData = new FormData();

      bodyFormData.append('firstname', values.firstname);
      bodyFormData.append('lastname', values.surname);
      bodyFormData.append('email', values.email);
      bodyFormData.append('encryptpassword', values.password);
      bodyFormData.append('mobile', values.mobile);
      bodyFormData.append('dob', birthdate);

      axios
        .post('http://atologistinfotech.com/api/register.php', bodyFormData, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then(res => {
          if (res.data.data.success === 1) {
            toast.success('Registered successfully');
          }
        })
        .catch(err => {
          if (err) {
            toast.error('Something went wrong');
          }
        });
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.paper} style={{ marginTop: '10px' }}>
          <Typography component="h5" variant="h5" align="center">
            Sign up
          </Typography>
          <Typography align="center">Use your current email address</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstname"
                label="First name"
                fullWidth
                autoComplete="given-name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="surname"
                name="surname"
                label="Surname"
                fullWidth
                autoComplete="family-name"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Your current email address"
                fullWidth
                autoComplete="shipping address-line1"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="mobile"
                name="mobile"
                label="Mobile number"
                fullWidth
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Birth month
                </InputLabel>
                <Select
                  name="month"
                  id="month"
                  fullWidth
                  labelId="demo-simple-select-label"
                  value={formik.values.month}
                  onChange={formik.handleChange}
                  error={formik.touched.month && Boolean(formik.errors.month)}
                  helperText={formik.touched.month && formik.errors.month}
                >
                  {months.map(d => (
                    <MenuItem value={d.value} key={d}>
                      {d.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="day"
                name="day"
                label="Day"
                fullWidth
                value={formik.values.day}
                onChange={formik.handleChange}
                error={formik.touched.day && Boolean(formik.errors.day)}
                helperText={formik.touched.day && formik.errors.day}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="year"
                name="year"
                label="Year"
                fullWidth
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="gender"
                name="gender"
                label="Gender (Optional)"
                fullWidth
                autoComplete="shipping postal-code"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography align="center">
                By clicking {'Continue'}, you agree to the{' '}
                <span style={{ color: '#188fff', textTransform: 'capitalize' }}>
                  Terms
                </span>{' '}
                and{' '}
                <span style={{ color: '#188fff', textTransform: 'capitalize' }}>
                  Privacy Policy
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                <Button
                  type="submit"
                  className={classes.continue}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Continue
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Typography align="center">
              Already have an account?
              <span style={{ color: '#188fff', textTransform: 'capitalize' }}>
                Sign in
              </span>
            </Typography>
          </Grid>
        </Paper>
      </form>
    </React.Fragment>
  );
}
