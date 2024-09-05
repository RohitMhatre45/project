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
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '8px 0',
    width: '100%',
  },
  '& .delete-btn': {
    background: '#FF5733',
    color: 'white',
  },
  '& .show-details-btn': {
    background: '#3498db',
    color: 'white',
  },
});

function AllSellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/sellers")
      .then(resp => {
        setSellers(resp.data.data);
      })
  }, []);

  const deleteSeller = (id) => {
    swal({
      title: "Delete Supplier",
      text: "Are you sure to delete this supplier?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:8080/api/sellers/${id}`)
            .then(resp => {
              setSellers(prevSellers => prevSellers.filter(seller => seller.id !== id));
            })
          swal("Supplier has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Supplier is not deleted!");
        }
      })
  }

  const showDetails = (seller) => {
    return swal({
      title: "Seller Details",
      text: `Name: ${seller.name}\nCity: ${seller.city}\nUser ID: ${seller.userid}\nPhone: ${seller.phone}`,
      icon: "info",
      button: "Close",
    });
  }

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">Manage Sellers</h4>
      <CardContainer>
        {sellers.map((seller) => (
          <Card key={seller.id}>
            <h5>{seller.name}</h5>
            <p>User ID: {seller.userid}</p>
            <button className="show-details-btn" onClick={() => showDetails(seller)}>Show Details</button>
            <button className="delete-btn" onClick={() => deleteSeller(seller.id)}>Delete</button>
          </Card>
        ))}
      </CardContainer>
    </div>
  )
}

export default AllSellers;
