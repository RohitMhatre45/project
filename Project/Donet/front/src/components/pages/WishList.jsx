import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const CenteredDiv = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const Stylecard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-10px);
  }
`;

const StyledCardText = styled(Card.Text)`
  font-weight: normal;
`;

const WishlistButton = styled(Button)`
  background-color: #fff;
  color: #ff4500;
  border: 1px solid #ff4500;
  &:hover {
    background: #ff6347 !important;
    color: #fff !important;
  }
`;

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = localStorage.getItem('user');

      if (!user) {
        navigate('/login');
        return;
      }

      const { userId } = JSON.parse(user);

      try {
        const wishlistResponse = await fetch(`http://localhost:5216/api/WishList/Get-All-WishLists`);
        if (!wishlistResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const wishlistData = await wishlistResponse.json();
        console.log(wishlistData);

        if (wishlistData.success) {
          const detailedWishlistItems = await Promise.all(
            wishlistData.data.map(async (item) => {
              const productResponse = await fetch(`http://localhost:5216/api/Product/Get-Product_id/${item.productId}`);
              const productData = await productResponse.json();
              console.log(productData);

              return {
                ...item,
                productName: productData.data.productName,
                productPrice: productData.data.productPrice,
                productImageUrl: productData.data.imageUrl,
                productDescription: productData.data.productDescription  // Add productDescription
              };
            })
          );

          setWishlistItems(detailedWishlistItems);
        } else {
          console.error('Failed to fetch wishlist data');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      const response = await fetch(`http://localhost:5216/api/WishList/Delete-WishList/${wishlistItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item.id !== wishlistItemId));
      } else {
        console.error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div>
      <CenteredDiv>
        <h1>Your Wishlist</h1>
      </CenteredDiv>
      <CardContainer>
        {wishlistItems.map(item => (
          <Stylecard key={item.productId}>
            <Card.Img variant="top" src={`http://localhost:5216${item.productImageUrl}`} alt={item.productName} />
            <Card.Body>
              <Card.Title>{item.productName}</Card.Title>
              <StyledCardText>
                <strong>Price: ₹</strong> {item.productPrice}<br />
                <strong>Description:</strong> {item.productDescription}<br />
              </StyledCardText>
              <WishlistButton variant="warning" onClick={() => handleRemoveFromWishlist(item.id)}>Remove from Wishlist</WishlistButton>
            </Card.Body>
          </Stylecard>
        ))}
      </CardContainer>
    </div>
  );
};

export default Wishlist;
