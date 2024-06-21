import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Form, Button, Alert, Container, Card, Col } from 'react-bootstrap';

export default function Profile() {
  const { currentUser, changePassword } = useAuth();

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setMessage('');
      await changePassword(currentPwd, newPwd);
      setMessage('Password updated successfully');
    } catch {
      setError('Failed to update password');
    }
  };

  return (
    <Container className="mt-4">
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Header as="h5" className="text-center bg-primary text-white">
            Profile Information
          </Card.Header>
          <Card.Body>
            <div className="text-center mb-4">
              <h4>{currentUser.name}</h4>
              <p className="text-muted">{currentUser.email}</p>
            </div>

            <hr />

            <h5>Username: {currentUser.username}</h5>
            <h5>Role: {currentUser.role}</h5>

            <hr />

            <h5 className="mb-3">Change Password</h5>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handlePasswordChange}>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Current password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit" block>
                Change Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}
