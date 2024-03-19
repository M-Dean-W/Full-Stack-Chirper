import React, { useState, useEffect } from 'react';
import { ChirpJOIN, User } from '../types';
import { fetchData } from '../services/fetchData';
import { Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const UserMentions = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const [mentions, setMentions] = useState<ChirpJOIN[]>([]);

  useEffect(() => {
    fetchData('/api/users')
      .then(users => setUsers(users))
  }, [])

  useEffect(() => {
    if (selectedUserId) {
      fetchData(`/api/chirps/mentions/${selectedUserId}`)
        .then((data) => setMentions(data))
    }
  }, [selectedUserId]);

  return (
    <Container>
    <div>
      <Form.Select
      className='bg-danger mt-3'
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select a Username to see if they were mentioned</option>
        {users.map((user) => (
          <option key={user.id} value={user.id.toString()}>
            {user.handle}
          </option>
        ))}
      </Form.Select>

      <Container>
        <div className="row justify-content-around p-3">
          <div className='col-sm-3 col-md-6'>
            {mentions.length ? mentions.map(chirp => (
              <Card key={chirp.id} className=" bg-light rounded-3 mb-3 mt-2">
                <Card.Title className='text-center mt-2'>
                  @{chirp.handle}
                </Card.Title>
                <Card.Body>
                  <Card.Text >
                    {chirp.body}
                  </Card.Text>
                </Card.Body>
              </Card>
            )):<h1 className='text-info'>No mentions found by this user</h1>};
          </div>
        </div>
      </Container>
    </div>
    </Container>
  );
};

export default UserMentions;