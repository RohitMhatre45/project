import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const [fullAddress, setFullAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');

    if (!user) {
      navigate('/login');
      return;
    }

    const { userId } = JSON.parse(user);

    const addressData = {
      userId,
      fullAddress,
      state,
      city,
      zipCode,
    };

    try {
      const response = await fetch('http://localhost:5216/api/ShippingAddress/Add-ShippingAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        alert('Address added successfully!');
        navigate('/'); // Navigate to home or another page after successful submission
      } else {
        alert('Failed to add address.');
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Add Shipping Address</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullAddress">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}  // Adjust the number of rows for more space
                placeholder="Enter full address"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Add Address
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingAddress;
