import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY, fetchData } from '../services/fetchData';



interface RegisterProps { }

const Register = (props: RegisterProps) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const [handle, setHandle] = useState('')
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetchData('/auth/register', 'POST', { email, handle, password })
      .then(token => {
        localStorage.setItem(TOKEN_KEY, token)
        navigate('/')
      })
      .catch(()=> console.log('something went wrong/invalid credentials'))
  };
  

  return (
    <Container>
          <Card className='bg-info mt-4' id='chirp-box'>
            <Card.Body>
              <Card.Title style={{ fontSize: '1.8em' }} className='p-2 text-center'>
                Register to serve the Empire
              </Card.Title>
              <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '1.5em' }}>Email:</Form.Label>
                  <Form.Control
                    className='bg-light'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '1.5em' }}>Handle/Username:</Form.Label>
                  <Form.Control
                    className='bg-light'
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                     />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '1.5em' }}>Password:</Form.Label>
                  <Form.Control
                    className='bg-light'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     />
                </Form.Group>
                <Button type='submit' variant='danger'>Register Account</Button>
              </Form>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Register;