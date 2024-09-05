// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// const SummaryContainer = styled.div`
//   max-width: 800px;
//   margin: 50px auto;
//   padding: 20px;
//   background-color: #f9f9f9;
//   box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const SectionTitle = styled.h3`
//   margin-bottom: 15px;
//   color: #555;
//   border-bottom: 2px solid #eee;
//   padding-bottom: 5px;
// `;

// const CartList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin-bottom: 20px;
// `;

// const CartItem = styled.li`
//   padding: 10px;
//   margin-bottom: 15px;
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// const ItemImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: contain;
//   border-radius: 8px;
//   margin-right: 15px;
// `;

// const ItemDetails = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
// `;

// const ItemDetail = styled.div`
//   margin-bottom: 5px;
//   font-size: 16px;
// `;

// const TotalAmount = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   text-align: right;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   margin-bottom: 5px;
//   display: block;
//   color: #555;
// `;

// const Input = styled.input`
//   padding: 10px;
//   font-size: 16px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const SubmitButton = styled.button`
//   padding: 12px;
//   font-size: 18px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Summary = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState({
//     userId: 0,
//     fullAddress: '',
//     state: '',
//     city: '',
//     zipCode: ''
//   });
  
//   const [total, setTotal] = useState(0);
//   const [shippingAddressId, setShippingAddressId] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.userId) {
//       setShippingAddress(prevState => ({
//         ...prevState,
//         userId: user.userId
//       }));
//     }

//     const fetchCartItems = async () => {
//       try {
//         const response = await fetch('http://localhost:5216/api/Cart/Get-All-Carts');
//         if (response.ok) {
//           const result = await response.json();
//           if (Array.isArray(result.data)) {
//             const cartItemsWithDetails = await Promise.all(result.data.map(async (item) => {
//               const productResponse = await fetch(`http://localhost:5216/api/Product/Get-Product_id/${item.productId}`);
//               if (productResponse.ok) {
//                 const productData = await productResponse.json();
//                 return { ...item, product: productData.data };
//               }
//               return item;
//             }));

//             setCartItems(cartItemsWithDetails);
//             calculateTotal(cartItemsWithDetails);
//           } else {
//             console.error('Error: Expected an array of cart items, but received:', result.data);
//             setCartItems([]);
//           }
//         } else {
//           console.error('Error fetching cart items:', response.statusText);
//           setCartItems([]);
//         }
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//         setCartItems([]);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const calculateTotal = (items) => {
//     const totalAmount = items.reduce((acc, item) => acc + ( item.product.productPrice) * item.quantity, 0);
//     setTotal(totalAmount);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShippingAddress({
//       ...shippingAddress,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // First, add the shipping address
//       const addressResponse = await fetch('http://localhost:5216/api/ShippingAddress/Add-ShippingAddress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(shippingAddress)
//       });

//       if (addressResponse.ok) {
//         const addressData = await addressResponse.json();
//         setShippingAddressId(addressData.data.shippingAddressId);

//         // Now, place the order
//         const orderPromises = cartItems.map(item => {
//           const orderData = {
//             userId: shippingAddress.userId,
//             shippingAddressId: addressData.data.shippingAddressId,
//             cartId: item.cartId,
//             quantity: item.quantity,
//             totalPrice: total // Or calculate per item if required
//           };

//           return fetch('http://localhost:5216/api/Order/PlaceOrder', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(orderData)
//           });
//         });

//         await Promise.all(orderPromises);
//         console.log('Order placed successfully');
//         // Clear cart or provide feedback to the user
//       } else {
//         console.error('Error adding the shipping address:', addressResponse.statusText);
//       }
//     } catch (error) {
//       console.error('Error processing the order:', error);
//     }
//   };

//   return (
//     <SummaryContainer>
//       <Title>Order Summary</Title>

//       <SectionTitle>Items in Your Cart</SectionTitle>
//       {cartItems.length > 0 ? (
//         <CartList>
//           {cartItems.map((item) => (
//             <CartItem key={item.cartId}>
//               <ItemImage src={`http://localhost:5216${item.product.imageUrl}`} alt={item.product.productName} />
//               <ItemDetails>
//                 <ItemDetail>Product: {item.product.productName}</ItemDetail>
//                 <ItemDetail>Quantity: {item.quantity}</ItemDetail>
//                 <ItemDetail>Price: ₹{ item.product.productPrice}</ItemDetail>
//                 {/* <ItemDetail>Total: ${item.quantity * (item.product.discountPrice || item.product.productPrice)}</ItemDetail> */}
//               </ItemDetails>
//             </CartItem>
//           ))}
//         </CartList>
//       ) : (
//         <p>No items in the cart</p>
//       )}

//       <TotalAmount>Total Amount: ₹{total}</TotalAmount>

//       <SectionTitle>Shipping Address</SectionTitle>
//       <Form onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label htmlFor="fullAddress">Full Address:</Label>
//           <Input
//             type="text"
//             id="fullAddress"
//             name="fullAddress"
//             value={shippingAddress.fullAddress}
//             onChange={handleInputChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label htmlFor="state">State:</Label>
//           <Input
//             type="text"
//             id="state"
//             name="state"
//             value={shippingAddress.state}
//             onChange={handleInputChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label htmlFor="city">City:</Label>
//           <Input
//             type="text"
//             id="city"
//             name="city"
//             value={shippingAddress.city}
//             onChange={handleInputChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label htmlFor="zipCode">Zip Code:</Label>
//           <Input
//             type="text"
//             id="zipCode"
//             name="zipCode"
//             value={shippingAddress.zipCode}
//             onChange={handleInputChange}
//             required
//           />
//         </FormGroup>

//         <SubmitButton type="submit">Submit Shipping Address & Place Order</SubmitButton>
//       </Form>
//     </SummaryContainer>
//   );
// };

// export default Summary;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  color: #555;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
`;

const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const CartItem = styled.li`
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemDetail = styled.div`
  margin-bottom: 5px;
  font-size: 16px;
`;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Summary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    userId: 0,
    fullAddress: '',
    state: '',
    city: '',
    zipCode: ''
  });
  
  const [total, setTotal] = useState(0);
  const [shippingAddressId, setShippingAddressId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setShippingAddress(prevState => ({
        ...prevState,
        userId: user.userId
      }));
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5216/api/Cart/Get-All-Carts');
        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result.data)) {
            // Filter cart items by logged-in userId
            const userCartItems = result.data.filter(item => item.userId == user.userId);
            const cartItemsWithDetails = await Promise.all(userCartItems.map(async (item) => {
              const productResponse = await fetch(`http://localhost:5216/api/Product/Get-Product_id/${item.productId}`);
              if (productResponse.ok) {
                const productData = await productResponse.json();
                return { ...item, product: productData.data };
              }
              return item;
            }));

            setCartItems(cartItemsWithDetails);
            calculateTotal(cartItemsWithDetails);
          } else {
            console.error('Error: Expected an array of cart items, but received:', result.data);
            setCartItems([]);
          }
        } else {
          console.error('Error fetching cart items:', response.statusText);
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + ( item.product.productPrice) * item.quantity, 0);
    setTotal(totalAmount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, add the shipping address
      const addressResponse = await fetch('http://localhost:5216/api/ShippingAddress/Add-ShippingAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingAddress)
      });

      if (addressResponse.ok) {
        const addressData = await addressResponse.json();
        setShippingAddressId(addressData.data.shippingAddressId);

        // Now, place the order
        const orderPromises = cartItems.map(item => {
          const orderData = {
            userId: shippingAddress.userId,
            shippingAddressId: addressData.data.shippingAddressId,
            cartId: item.cartId,
            quantity: item.quantity,
            totalPrice: total // Or calculate per item if required
          };

          return fetch('http://localhost:5216/api/Order/PlaceOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          });
        });

        await Promise.all(orderPromises);
        console.log('Order placed successfully');
        // Clear cart or provide feedback to the user
      } else {
        console.error('Error adding the shipping address:', addressResponse.statusText);
      }
    } catch (error) {
      console.error('Error processing the order:', error);
    }
  };

  return (
    <SummaryContainer>
      <Title>Order Summary</Title>

      <SectionTitle>Items in Your Cart</SectionTitle>
      {cartItems.length > 0 ? (
        <CartList>
          {cartItems.map((item) => (
            <CartItem key={item.cartId}>
              <ItemImage src={`http://localhost:5216${item.product.imageUrl}`} alt={item.product.productName} />
              <ItemDetails>
                <ItemDetail>Product: {item.product.productName}</ItemDetail>
                <ItemDetail>Quantity: {item.quantity}</ItemDetail>
                <ItemDetail>Price: ₹{ item.product.productPrice}</ItemDetail>
                {/* <ItemDetail>Total: ${item.quantity * (item.product.discountPrice || item.product.productPrice)}</ItemDetail> */}
              </ItemDetails>
            </CartItem>
          ))}
        </CartList>
      ) : (
        <p>No items in the cart</p>
      )}

      <TotalAmount>Total Amount: ₹{total}</TotalAmount>

      <SectionTitle>Shipping Address</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullAddress">Full Address:</Label>
          <Input
            type="text"
            id="fullAddress"
            name="fullAddress"
            value={shippingAddress.fullAddress}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="state">State:</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="zipCode">Zip Code:</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingAddress.zipCode}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Submit Shipping Address & Place Order</SubmitButton>
      </Form>
    </SummaryContainer>
  );
};

export default Summary;
