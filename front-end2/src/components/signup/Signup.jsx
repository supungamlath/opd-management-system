import './signup.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';
import { SHA256 } from "crypto-js";

export default function Signup() {

  const navigate = useNavigate()
  const { signIn } = useContext(AuthContext)

  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

  // used for storing user input
  const [signup, setLogin] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    name: '',
    role: 'Patient',
    email: '',
    nic: '',
  });

  // handle input change
  function handleChange(event) {
    const { name, value } = event.target
    setLogin(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSubmit = async (submit) => {
    // check if passwords match
    // check if password is good enough
    if (signup.password.length < 6) {
      popAlert('Password must be at least 6 characters long');
      return;
    }


    if (signup.password !== signup.confirm_password) {
      popAlert('Passwords do not match');
      return;
    }

    submit.preventDefault();

    await axios({
      url: `/api/user/signup`,
      method: 'POST',
      data: {
        username: signup.username.trim(),
        password: SHA256(signup.password).toString(),
        name: signup.name,
        role: signup.role,
        email: signup.email,
        nic: signup.nic,
      }
    })
      .then((res) => {
        console.log('Successfully logged user');
        localStorage.setItem('jwt', res.data.token);
        // console.log(res.data)
        signIn(res.data);
        // console.log(localStorage.jwt)
        popAlert(`Welcome Back`);
        navigate('/');
        return res.data;
      })
      .catch(
        async (error) => {
          await axios({
            url: `/api/patient/signin`,
            method: 'POST',
            data: {
              username: signup.username.trim(),
              password: signup.password,
              confirm_password: signup.confirm_password,
              name: signup.name,
              role: signup.role,
              email: signup.email,
              nic: signup.nic,
            }
          })
            .then((res) => {
              console.log('Successfully signed up patient');
              localStorage.setItem('jwt', res.data.token);
              // console.log(res.data)
              signIn(res.data);
              // console.log(localStorage.jwt)
              popAlert(`Signed Up Successfully`);
              navigate('/');
              return res.data;
            })
            .catch(
              (error) => {
                if (error.response) {
                  // Request made and server responded
                  setErrorMessages("Please check your details again")
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request)
                  setErrorMessages('No response!')
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message)
                  setErrorMessages('Somthing wrong!')
                }
              }
            )


        }
      )

  }

  // Generate JSX code for login form
  const loginForm = (

    <main className='App-main'>
      <div className='login'>
        <div>
          <form action="/" onSubmit={handleSubmit}>

            <div className='input-holder'>
              <label>Full Name</label><br />
              <input
                type="name"
                name="name"
                placeholder={'Enter your full name'}
                required
                autoFocus
                onChange={handleChange}
                value={signup.name}
              />
            </div>

            <div className='input-holder'>
              <label>NIC number</label><br />
              <input
                type="name"
                name="nic"
                placeholder={'Enter your nic number'}
                required
                autoFocus
                onChange={handleChange}
                value={signup.nic}
              />
            </div>

            <div className='input-holder'>
              <label>Email</label><br />
              <input
                type="email"
                name="email"
                placeholder={'Enter your full name'}
                required
                autoFocus
                onChange={handleChange}
                value={signup.email}
              />
            </div>

            <div className='input-holder'>
              <label>Username</label><br />
              <input
                type="username"
                name="username"
                placeholder={'Enter your Username'}
                required
                autoFocus
                onChange={handleChange}
                value={signup.username}
              />
            </div>

            <div className='input-holder'>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder={'Enter your Password'}
                required
                onChange={handleChange}
                value={signup.password}
              />
            </div>

            <div className='input-holder'>
              <label>confirm password</label><br />
              <input
                type="password"
                name="confirm_password"
                placeholder={'Confirm your Password'}
                required
                autoFocus
                onChange={handleChange}
                value={signup.confirm_password}
                check={signup.password === signup.confirm_password}
              />
            </div>

            <div className="input-holder">
              <button id="sub_btn" type="submit" >Sign up</button>
            </div>

            <div className="error">{errorMessages}</div>

          </form>

        </div>
      </div>
    </main>

  )

  return (
    <div>
      {loginForm}
    </div>
  )
}
