import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './form.css';
import './menu.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

const SigninForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add state for error message
  const navigate = useNavigate(); // Use useNavigate instead of history

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9898/api/auth/signin', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      navigate('/addArticle'); 
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid username or password'); 
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ backgroundColor: "#fff", borderRadius: '25px' }}>
        <p className="text-center mb-5 mx-1 mx-md-4 mt-4" style={{ fontSize: "30px", color: "black" }}>Sign in form</p>
        <MDBCardImage alt="" className='image' src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <form onSubmit={handleSubmit} className="w-100">
                {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Conditionally render error message */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" className="me-3" size='lg' />
                  <MDBInput
                    style={{ border: '2px solid #0080FF', textAlign: 'center', width: '100%', marginRight: '10px', borderRadius: '25px', backgroundColor: '#66B2FF' }}
                    label='Username'
                    id='form1'
                    type='text'
                    className='w-100'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" className="me-3" size='lg' />
                  <MDBInput
                    style={{ border: '2px solid #0080FF', textAlign: 'center', width: '100%', marginRight: '10px', borderRadius: '25px', backgroundColor: '#66B2FF' }}
                    label='Password'
                    id='form3'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <MDBBtn
                  style={{ width: '150px', height: "50px", borderRadius: '25px', backgroundColor: '#FFFF99', border: '2px solid #FFFF00' }}
                  type='submit'
                  className='mb-3'
                  size='lg'
                >
                  Sign In
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

SigninForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SigninForm;
