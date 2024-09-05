import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

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
  span.bold {
    font-weight: bold;
  }
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

  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:5216/api/WishList/Get-All-WishLists');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          const wishlistData = data.data;

          // Fetch user and product details for each wishlist item
          const detailedWishlistItems = await Promise.all(
            wishlistData.map(async (item) => {
              const userResponse = await fetch(`http://localhost:5216/api/User/Get-User/${item.userId}`);
              const userData = await userResponse.json();

              const productResponse = await fetch(`http://localhost:5216/api/Product/Get-Product_id/${item.productId}`);
              const productData = await productResponse.json();

              return {
                ...item,
                userName: userData.data.userName,
                productName: productData.data.productName,
                productPrice: productData.data.productPrice,
                productImageUrl: productData.data.imageUrl
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
  }, []);

  return (
    <div>
      <CenteredDiv>
        <h1>Your Wishlist</h1>
      </CenteredDiv>
      <CardContainer>
        {wishlistItems.map(item => (
          <Stylecard key={item.productId}>
            <Card.Body>
              <Card.Title>{item.productName}</Card.Title>
              <Card.Img variant="top" src={`http://localhost:5216${item.productImageUrl}`} alt={item.productName} />
              <StyledCardText>
                <strong>Price: ₹</strong> {item.productPrice}<br />
                <strong>Added by:</strong> {item.userName}
              </StyledCardText>
              <WishlistButton variant="warning">Remove from Wishlist</WishlistButton>
            </Card.Body>
          </Stylecard>
        ))}
      </CardContainer>
    </div>
  );
};

export default Wishlist;
