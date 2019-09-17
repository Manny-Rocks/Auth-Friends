  
import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        password: ''
      },
      isLoading: false,
      isLoaded: false
    }
  }
  

  handleChange = event => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    })
  }

  handleLogin = event => {
    event.preventDefault();
    // this.setState({ ...this.state, isLoading: true })
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        this.props.history.push('/friends')})
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loader type='TailSpin' color='#00BFFF' height={100} width={100} />
        ) : (
          <div className='login-form'>
            <h1>Login Form</h1>
            <form onSubmit={this.handleLogin}>
              <input
                type='text'
                name='username'
                placeholder='username'
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
              <input
                type='password'
                name='password'
                placeholder='password'
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
              {/* <Link to='/login'> */}
              <button type='submit'>Log in</button>
              {/* </Link> */}
            </form>
          </div>
        )}
      </>
    )
  }
}

export default LoginForm;