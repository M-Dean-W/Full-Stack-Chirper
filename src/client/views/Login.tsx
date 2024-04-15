import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY, fetchData } from '../services/fetchData';



interface LoginProps { }

const Login = (props: LoginProps) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()

    useEffect(() => {
    fetchData('/api/emails')
      .then(email => setEmail(email))
  }, [])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetchData('/auth/login', 'POST', { email, password })
      .then(token => {
        localStorage.setItem(TOKEN_KEY, token)
        navigate('/')
      })
      .catch(()=> console.log('something went wrong'))
  };
  


  return (
    <Container>
          <Card className='bg-info mt-4' id='chirp-box'>
            <Card.Body>
              <Card.Title className='p-2'>
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
                  <Form.Label style={{ fontSize: '1.5em' }}>Password:</Form.Label>
                  <Form.Control
                    className='bg-light'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     />
                </Form.Group>
                <Button type='submit' variant='danger'>Login</Button>
              </Form>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Login;