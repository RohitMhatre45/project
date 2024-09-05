// import React, { useState, useEffect } from 'react';
// import Cards from './Cards'; // Ensure this component exists
// import './home.css'; // Ensure your styles are applied
// import { useSpring } from '@react-spring/web';
// import { Card, Button } from 'react-bootstrap';
// import styled from 'styled-components';

// // Styled Components
// const CenteredDiv = styled.div`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const CardContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
//   justify-content: center;
// `;

// const Stylecard = styled(Card)`
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   transition: transform 0.2s;
//   &:hover {
//     transform: translateY(-10px);
//   }
// `;

// const StyledCardText = styled(Card.Text)`
//   font-weight: normal;
//   span.bold {
//     font-weight: bold;
//   }
// `;

// const PriceButton = styled(Button)`
//   background-color: #fff;
//   color: green;
//   border: 1px solid green;
//   padding: 8px 12px;
//   font-size: 14px;
//   min-width: 80px; /* Set a minimum width */
//   white-space: nowrap;
//   text-align: center;
//   &:hover {
//     background: #397d58 !important;
//     color: #fff !important;
//   }
// `;

// const CartButton = styled(Button)`
//   background-color: #fff;
//   color: #007bff;
//   border: 1px solid #007bff;
//   margin-left: 10px;
//   padding: 8px 12px;
//   font-size: 14px;
//   min-width: 80px; /* Set a minimum width */
//   white-space: nowrap;
//   text-align: center;
//   &:hover {
//     background: #0056b3 !important;
//     color: #fff !important;
//   }
// `;

// const WishListButton = styled(Button)`
//   background-color: #fff;
//   color: #ff4500;
//   border: 1px solid #ff4500;
//   margin-left: 10px;
//   padding: 8px 12px;
//   font-size: 14px;
//   min-width: 80px; /* Set a minimum width */
//   white-space: nowrap;
//   text-align: center;
//   &:hover {
//     background: #ff6347 !important;
//     color: #fff !important;
//   }
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px; /* Add gap between buttons */
//   margin-top: 10px;
//   flex-wrap: wrap; /* Allow wrapping if needed */
// `;

// const ImageWrapper = styled.div`
//   width: 100%;
//   padding-top: 75%; /* Aspect ratio 4:3 */
//   position: relative;
// `;

// const Image = styled(Card.Img)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   border-radius: 8px 8px 0 0; /* Rounded corners at the top */
// `;

// // Home Component
// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5216/api/Product/Get-All-Product');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setProducts(Array.isArray(data.data) ? data.data : []);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Fetch userId from local storage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
//     const roleid = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
//     if (user && user.userId) {
//       setUserId(user.userId);
//     }
//   }, []);

//   // Add product to cart
//   const addToCart = async (product) => {
//     if (!userId) {
//       alert('User not logged in');
//       return;
//     }

//     const cartItem = {
//       userId: userId,
//       productId: product.productId,
//       quantity: 1, // Assuming adding one item to the cart
//     };

//     try {
//       const response = await fetch('http://localhost:5216/api/Cart/Add-Cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cartItem),
//       });

//       console.log(response);

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       if (data.success) {
//         alert(`${product.productName} added to cart successfully`);
//       } else {
//         alert('Failed to add to cart');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Error adding to cart');
//     }
//   };

//   // Add product to wishlist
//   const addToWishList = async (product) => {
//     if (!userId) {
//       alert('User not logged in');
//       return;
//     }
//     const wishListItem = {
//       userId: userId,
//       productId: product.productId,
//       userName: product.productName, // Replace with actual user name if available
//       productName: product.productName,
//       productPrice: product.productPrice
//     };

//     try {
//       const response = await fetch('http://localhost:5216/api/WishList/Add-WishList', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(wishListItem),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       if (data.success) {
//         alert('Added to wishlist successfully');
//       } else {
//         alert('Failed to add to wishlist');
//       }
//     } catch (error) {
//       console.error('Error adding to wishlist:', error);
//       alert('Error adding to wishlist');
//     }
//   };

//   const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 3000 } });

//   return (
//     <>
//       <Cards />

//       <CenteredDiv>
//         <h1>Available Books</h1>
//       </CenteredDiv>

//       <CardContainer>
//         {products.map(product => (
//           <Stylecard key={product.id}>
//             <ImageWrapper>
//               <Image variant="top" src={`http://localhost:5216${product.imageUrl}`} alt={product.productName} />
//             </ImageWrapper>
//             <Card.Body>
//               <Card.Title>{product.productName}</Card.Title>
//               <StyledCardText>
//                 <strong>Description:</strong> {product.productDescription}<br />
//                 <strong>Price: ₹</strong> {product.productPrice}<br />
//               </StyledCardText>
//               <ButtonWrapper>
//                 {/* <PriceButton variant="primary">Buy Now</PriceButton> */}
//                 <CartButton variant="secondary" onClick={() => addToCart(product)}>Add to Cart</CartButton>
//                 <WishListButton variant="warning" onClick={() => addToWishList(product)}>Add to Wishlist</WishListButton>
//               </ButtonWrapper>
//             </Card.Body>
//           </Stylecard>
//         ))}
//       </CardContainer>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import Cards from './Cards'; // Ensure this component exists
import './home.css'; // Ensure your styles are applied
import { useSpring } from '@react-spring/web';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode'

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

const PriceButton = styled(Button)`
  background-color: #fff;
  color: green;
  border: 1px solid green;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 80px; /* Set a minimum width */
  white-space: nowrap;
  text-align: center;
  &:hover {
    background: #397d58 !important;
    color: #fff !important;
  }
`;

const CartButton = styled(Button)`
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 80px; /* Set a minimum width */
  white-space: nowrap;
  text-align: center;
  &:hover {
    background: #0056b3 !important;
    color: #fff !important;
  }
`;

const WishListButton = styled(Button)`
  background-color: #fff;
  color: #ff4500;
  border: 1px solid #ff4500;
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
  min-width: 80px; /* Set a minimum width */
  white-space: nowrap;
  text-align: center;
  &:hover {
    background: #ff6347 !important;
    color: #fff !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Add gap between buttons */
  margin-top: 10px;
  flex-wrap: wrap; /* Allow wrapping if needed */
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 75%; /* Aspect ratio 4:3 */
  position: relative;
`;

const Image = styled(Card.Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px 8px 0 0; /* Rounded corners at the top */
`;

// Home Component
const Home = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [roleid, setRoleId] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5216/api/Product/Get-All-Product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Fetch userId and roleid from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const roleid = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      setRoleId(roleid);
    }
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    if (!userId) {
      alert('User not logged in');
      return;
    }

    const cartItem = {
      userId: userId,
      productId: product.productId,
      quantity: 1, // Assuming adding one item to the cart
    };

    try {
      const response = await fetch('http://localhost:5216/api/Cart/Add-Cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        alert(`${product.productName} added to cart successfully`);
      } else {
        alert('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  // Add product to wishlist
  const addToWishList = async (product) => {
    if (!userId) {
      alert('User not logged in');
      return;
    }
    const wishListItem = {
      userId: userId,
      productId: product.productId,
      userName: product.productName, // Replace with actual user name if available
      productName: product.productName,
      productPrice: product.productPrice
    };

    try {
      const response = await fetch('http://localhost:5216/api/WishList/Add-WishList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishListItem),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        alert('Added to wishlist successfully');
      } else {
        alert('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error adding to wishlist');
    }
  };

  const fadeInProps = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 3000 } });

  return (
    <>
      <Cards />

      <CenteredDiv>
        <h1>Available Books</h1>
      </CenteredDiv>

      <CardContainer>
        {products.map(product => (
          <Stylecard key={product.id}>
            <ImageWrapper>
              <Image variant="top" src={`http://localhost:5216${product.imageUrl}`} alt={product.productName} />
            </ImageWrapper>
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <StyledCardText>
                <strong>Description:</strong> {product.productDescription}<br />
                <strong>Price: ₹</strong> {product.productPrice}<br />
              </StyledCardText>
              {/* Show buttons only if roleid is not "Seller" */}
              {roleid !== "Seller" && roleid !== "Admin" &&  (
                <ButtonWrapper>
                  {/* <PriceButton variant="primary">Buy Now</PriceButton> */}
                  <CartButton variant="secondary" onClick={() => addToCart(product)}>Add to Cart</CartButton>
                  <WishListButton variant="warning" onClick={() => addToWishList(product)}>Add to Wishlist</WishListButton>
                </ButtonWrapper>
              )}
            </Card.Body>
          </Stylecard>
        ))}
      </CardContainer>
    </>
  );
};

export default Home;
