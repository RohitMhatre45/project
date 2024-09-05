import axios from "axios";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { styled } from '@mui/system';

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
});

const Card = styled('div')({
  background: '#222',
  color: 'white',
  padding: '24px',
  borderRadius: '12px',
  width: '300px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '& h5': {
    margin: '0',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  '& p': {
    margin: '8px 0',
    fontSize: '16px',
  },
  '& button': {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '8px 0',
    width: '100%',
  },
});

function AllCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers")
      .then(resp => {
        setCustomers(resp.data.data);
      })
  }, []);

  const showDetails = (customer) => {
    swal({
      title: "Customer Details",
      text: `Name: ${customer.name}\nCity: ${customer.city}\nGender: ${customer.gender}\nPhone: ${customer.phone}\nUser ID: ${customer.userid}\nPassword: ${'*'.repeat(customer.pwd.length)}`,
      icon: "info",
      button: "Close",
    });
  }

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">All Customers</h4>
      <CardContainer>
        {customers.map((customer) => (
          <Card key={customer.id} onClick={() => showDetails(customer)}>
            <h5>{customer.name}</h5>
            <p>User ID: {customer.userid}</p>
            <button>Show Details</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  )
}

export default AllCustomers;
