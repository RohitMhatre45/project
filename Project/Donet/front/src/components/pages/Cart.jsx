import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Updated to useNavigate

  // Fetch userId from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      console.log(user.userId);
      setUserId(user.userId);
    }
  }, []);

  // Fetch cart items for the logged-in user

  useEffect(() => {
    console.log(userId);
    
    if (userId) {
      fetch(`http://localhost:5216/api/Cart/Get-All-Carts`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data.userId);
          
          const userCartItems = data.data.filter(item => item.userId.toString() == userId.toString());

          console.log(userCartItems);
          fetchProductDetails(userCartItems);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, [userId]);

  // useEffect(() => {
  //   console.log("userId:", userId);
    
  //   if (userId) {
  //     fetch(`http://localhost:5216/api/Cart/Get-All-Carts`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Fetched cart data:", data.data);
          
  //         const userCartItems = data.data.filter(item => {
  //           console.log("Comparing item userId:", item.userId, "with userId:", userId);
  //           return item.userId === userId;
  //         });
  //         console.log("Filtered userCartItems:", userCartItems);
  //         fetchProductDetails(userCartItems);
  //       })
  //       .catch((error) => console.error('Error fetching cart items:', error));
  //   }
  // }, [userId]);
  

  // Fetch product details for each cart item
  const fetchProductDetails = async (cartItems) => {
    try {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const productResponse = await fetch(`http://localhost:5216/api/Product/Get-Product_id/${item.productId}`);
            if (!productResponse.ok) {
              throw new Error(`Error fetching product ${item.productId}: ${productResponse.statusText}`);
            }
            const productData = await productResponse.json();

            return {
              ...item,
              productName: productData.data.productName,
              productPrice: productData.data.productPrice,
              productImageUrl: productData.data.imageUrl,
            };
          } catch (error) {
            console.error(`Failed to fetch product ${item.productId}:`, error);
            return null; // Return null for failed fetches
          }
        })
      );

      // Filter out any null items
      const filteredCartItems = updatedCartItems.filter(item => item !== null);

      setCartItems(filteredCartItems);
      calculateTotal(filteredCartItems);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    setTotalPrice(total);
  };

  // Remove item from cart using cartId
  const removeFromCart = (cartId) => {
    fetch(`http://localhost:5216/api/Cart/Delete-Cart-By-Id/${cartId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedCart = cartItems.filter(item => item.cartId !== cartId);
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
        alert('Product removed from cart');
      } else {
        alert('Failed to remove product from cart');
      }
    })
    .catch((error) => console.error('Error removing product from cart:', error));
  };

  // Handle "Order Now" click
  const handleOrderNow = () => {
    const orderData = cartItems.map(item => ({
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
    }));

    console.log('Order Data:', orderData);

    // Store the orderData in localStorage for temporary storage
    localStorage.setItem('orderData', JSON.stringify(orderData));

    // Redirect to /summary page
    navigate('/summary'); // Updated to use navigate
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col md={4} key={item.cartId}>
                <Card className="mb-4">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:5216${item.productImageUrl}`} 
                    alt={item.productName} 
                    style={{ height: '400px', objectFit: 'contain' }} 
                  />
                  <Card.Body>
                    <Card.Title>{item.productName}</Card.Title>
                    <Card.Text>
                      Price: ₹{item.productPrice}<br />
                      Quantity: {item.quantity}
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item.cartId)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <h4>Total Price: ₹{totalPrice}</h4>
              <Button variant="success" onClick={handleOrderNow}>
                Order Now
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;


