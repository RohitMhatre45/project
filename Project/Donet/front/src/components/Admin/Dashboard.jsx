import React from 'react'
import UserRolesManagement from './Roles/UserRolesManagement'
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddProductForm from './AddProducts/AddProductForm';
const Dashboard = () => {
  return (
    <>
     <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <UserRolesManagement/>
      <AddProductForm/>
    
    </Container>
    </>
  )
}

export default Dashboard