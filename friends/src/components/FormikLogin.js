import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    isLoading: false
  }

  render() {
    return (
      <div className='login-form'>
        <h1>Login Form</h1>
        <Form>
          <Field 
            type='text'
            name='username'
            placeholder='username'
            className='form-field'
          />
          <Field 
            type='password'
            name='password'
            placeholder='password'
            className='form-field'
          />
          <Link to='/login'>
            <button type='submit'>Submit</button>
          </Link>
        </Form>
      </div>
    )
  }
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || ''
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup 
      .string()
      .required('You must enter your credentials to proceed.')
      .min(8, 'username must be min length of 8'),
    password: Yup
      .string()
      .required('You must enter your credentials to proceed.')
      .min(8, 'Password must be min length of 8'),
  }),

  handleSubmit(values, { setStatus, setErrors, resetForm }) {
    if (values.username === 'pdadlani') {
      setErrors({ username: 'That username is already taken' });
    } else {
      axios
        .post('', values)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }
  }
})(LoginForm);

export default FormikLoginForm;