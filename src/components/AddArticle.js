import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
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

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  let accessToken; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { title, body, description };

    try {
      const signinResponse = await axios.get('https://localhost:3000/signin');
      accessToken = signinResponse.data.accessToken; 

      const articleResponse = await fetch('https://localhost:9898/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`, 
        },
        body: JSON.stringify(requestBody),
      });

      if (articleResponse.status === 401) {
        setMessage('User is unauthorized. Please log in.');
        return;
      }

      const data = await articleResponse.json();

      if (data.success) {
        setMessage('Article added!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(`An error occurred. Please try again later. Access token: ${accessToken}`);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ backgroundColor: "#fff", borderRadius: '25px' }}>
        <p className="text-center mb-5 mx-1 mx-md-4 mt-4" style={{ fontSize: "30px", color: "black" }}>Article adding form</p>
        <MDBCardImage alt="" className='image' src='https://academiamag.com/wp-content/uploads/2022/11/360_F_225318919_klpkRFyiJjxWdwLptzfeCX2Bo6QsBndm.jpg' fluid />
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <form onSubmit={handleSubmit} className="w-100">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" className="me-3" size='lg' />
                  <MDBInput style={{ border: '2px solid #0080FF', textAlign: 'center', width: '100%', marginRight: '10px', borderRadius: '25px', backgroundColor: '#66B2FF' }} label='Title' id='form1' type='text' className='w-100' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" className="me-3" size='lg' />
                  <MDBInput style={{ border: '2px solid #0080FF', textAlign: 'center', width: '100%', height: "100px", marginRight: '10px', borderRadius: '25px', backgroundColor: '#66B2FF' }} label='Body' id='form2' type='text' value={body} onChange={(e) => setBody(e.target.value)} required />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" className="me-3" size='lg' />
                  <MDBInput style={{ border: '2px solid #0080FF', textAlign: 'center', width: '100%', height: "100px", marginRight: '10px', borderRadius: '25px', backgroundColor: '#66B2FF' }} label='Description' id='form3' type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <MDBBtn style={{ width: '150px', height: "50px", borderRadius: '25px', backgroundColor: '#FFFF99', border: '2px solid #FFFF00' }}
                  type='submit' className='mb-3' size='lg'>Add</MDBBtn>
              </form>

              {message && <p>{message}</p>}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
