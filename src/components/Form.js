import { useState } from 'react';
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

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== repeatPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const requestBody = { username, email, password };

    try {
      const response = await fetch('http://localhost:9898/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Sign up successful!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ backgroundColor: "#fff",  borderRadius: '25px' }}>
        <p className="text-center mb-5 mx-1 mx-md-4 mt-4" style={{ fontSize: "30px", color:"black"}}>Sign up form</p>
        <MDBCardImage alt="" className='image' src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <form onSubmit={handleSubmit} className="w-100">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" className="me-3" size='lg' />
                  <MDBInput style={{border: '2px solid #0080FF', textAlign: 'center', width: '100%' , marginRight: '10px', borderRadius: '25px', backgroundColor:'#66B2FF' }} label='Username' id='form1' type='text' className='w-100' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" className="me-3" size='lg' />
                  <MDBInput style={{border: '2px solid #0080FF', textAlign: 'center', width: '100%' , marginRight: '10px', borderRadius: '25px', backgroundColor:'#66B2FF' }} label='Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" className="me-3" size='lg' />
                  <MDBInput style={{border: '2px solid #0080FF', textAlign: 'center', width: '100%' , marginRight: '10px', borderRadius: '25px', backgroundColor:'#66B2FF' }} label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" className="me-3" size='lg' />
                  <MDBInput style={{border: '2px solid #0080FF', textAlign: 'center', width: '100%' , marginRight: '10px', borderRadius: '25px', backgroundColor:'#66B2FF' }} label='Repeat password' id='form4' type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                </div>

                <MDBBtn style={{width: '150px', height:"50px", borderRadius: '25px', backgroundColor:'#FFFF99', border: '2px solid #FFFF00'}}
                type='submit' className='mb-3' size='lg'>Register</MDBBtn>
              </form>

              {message && <p>{message}</p>}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
