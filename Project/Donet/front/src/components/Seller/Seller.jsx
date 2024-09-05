// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
// import './Sel.css'; // Ensure your custom styles are applied

// const Seller = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]); // To store user's products
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [productPrice, setProductPrice] = useState(0);
//   const [discountPrice, setDiscountPrice] = useState(0);
//   const [stockQuantity, setStockQuantity] = useState(0);
//   const [imageFile, setImageFile] = useState(null);
//   const [editingProductId, setEditingProductId] = useState(null); // For editing product

//   const userId = JSON.parse(localStorage.getItem('user'))?.userId;

//   useEffect(() => {
//     // Fetch all categories
//     fetch('http://localhost:5216/api/Category/Get-All-Categorys')
//       .then(response => response.json())
//       .then(data => {
//         if (data && Array.isArray(data.data)) {
//           console.log(data.data);
          
//           setCategories(data.data);
//         } else {
//           console.error('Expected an array but got:', data.data);
//         }
//       })
//       .catch(error => {
//         console.error("There was an error fetching the categories!", error);
//       });

//     // Fetch all products and filter by userId
//     fetch('http://localhost:5216/api/Product/Get-All-Product')
//       .then(response => response.json())
//       .then(data => {
//         if (data && Array.isArray(data.data)) {
//           console.log(data.data.userId)
//           data.data.forEach(product => {
//             console.log(product.userId === userId);
//             console.log(userId); // This logs the userId for each product
//           });
//           const userProducts = data.data.filter(product => product.userId == userId);
//           console.log(userProducts)
//           console.log(userProducts);
          
//           setProducts(userProducts);
//         } else {
//           console.error('Expected an array but got:', data.data);
//         }
//       })
//       .catch(error => {
//         console.error("There was an error fetching the products!", error);
//       });
//   }, [userId]);

//   const handleProductSubmit = (e) => {
//     e.preventDefault();

//     // Prepare the form data
//     const formData = new FormData();
//     formData.append('ProductName', productName);
//     formData.append('ProductDescription', productDescription);
//     formData.append('CategoryId', categoryId);
//     formData.append('ProductPrice', productPrice);
//     formData.append('DiscountPrice', discountPrice);
//     formData.append('StockQuantity', stockQuantity);

//     // Append the userId
//     formData.append('UserId', userId);

//     // Always include an ImageUrl
//     const imageUrl = imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/150';
//     formData.append('ImageUrl', imageUrl);

//     // Append the image file if present
//     if (imageFile) {
//       formData.append('ImageFile', imageFile);
//     }

//     const url = editingProductId
//       ? `http://localhost:5216/api/Product/Update_Product_By_Id/${editingProductId}`
//       : 'http://localhost:5216/api/Product/Adding-Product';

//     const method = editingProductId ? 'PUT' : 'POST';

//     // Post the product data using fetch API
//     fetch(url, {
//       method: method,
//       body: formData,
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log("Product added/updated successfully!", data);

//         // Clear the form fields
//         setProductName('');
//         setProductDescription('');
//         setCategoryId('');
//         setProductPrice(0);
//         setDiscountPrice(0);
//         setStockQuantity(0);
//         setImageFile(null);
//         setEditingProductId(null);

//         // Alert the user
//         alert('Product added/updated successfully!');

//         // Optionally, update the product list after adding a product
//         if (data && data.data) {
//           if (editingProductId) {
//             // Update the product list with the edited product
//             setProducts(prevProducts => 
//               prevProducts.map(product => 
//                 product.productId === editingProductId ? data.data : product
//               )
//             );
//           } else {
//             // Add the new product to the list
//             setProducts(prevProducts => [...prevProducts, data.data]);
//           }
//         }
//       })
//       .catch(error => {
//         console.error("There was an error adding/updating the product!", error);
//       });
//   };

//   const handleEdit = (product) => {
//     // Populate form fields with product data for editing
//     setProductName(product.productName);
//     setProductDescription(product.productDescription);
//     setCategoryId(product.categoryId);
//     setProductPrice(product.productPrice);
//     setDiscountPrice(product.discountPrice);
//     setStockQuantity(product.stockQuantity);
//     setEditingProductId(product.productId);
//   };

//   const handleDelete = (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       fetch(`http://localhost:5216/api/Product/delete_Product_by_Id/${productId}`, {
//         method: 'DELETE',
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log("Product deleted successfully!", data);
//           setProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
//         })
//         .catch(error => {
//           console.error("There was an error deleting the product!", error);
//         });
//     }
//   };

//   return (
//     <Container>
//       <h1 className="my-4">Add New Product</h1>
//       <Form onSubmit={handleProductSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="productName">
//               <Form.Label>Product Name</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 value={productName} 
//                 onChange={(e) => setProductName(e.target.value)} 
//                 placeholder="Enter product name" 
//                 required 
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="productPrice">
//               <Form.Label>Product Price</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 value={productPrice} 
//                 onChange={(e) => setProductPrice(e.target.value)} 
//                 placeholder="Enter product price" 
//                 required 
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group controlId="discountPrice">
//               <Form.Label>Discount Price</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 value={discountPrice} 
//                 onChange={(e) => setDiscountPrice(e.target.value)} 
//                 placeholder="Enter discount price" 
//                 required 
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="stockQuantity">
//               <Form.Label>Stock Quantity</Form.Label>
//               <Form.Control 
//                 type="number" 
//                 value={stockQuantity} 
//                 onChange={(e) => setStockQuantity(e.target.value)} 
//                 placeholder="Enter stock quantity" 
//                 required 
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Form.Group controlId="productDescription" className="mb-3">
//           <Form.Label>Product Description</Form.Label>
//           <Form.Control 
//             as="textarea" 
//             rows={3} 
//             value={productDescription} 
//             onChange={(e) => setProductDescription(e.target.value)} 
//             placeholder="Enter product description" 
//             required 
//           />
//         </Form.Group>
//         <Form.Group controlId="categoryId" className="mb-3">
//           <Form.Label>Category</Form.Label>
//           <Form.Control 
//             as="select" 
//             value={categoryId} 
//             onChange={(e) => setCategoryId(e.target.value)} 
//             required
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category.categoryId} value={category.categoryId}>
//                 {category.categoryName}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="imageFile" className="mb-3">
//           <Form.Label>Product Image</Form.Label>
//           <Form.Control 
//             type="file" 
//             onChange={(e) => setImageFile(e.target.files[0])} 
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           {editingProductId ? 'Update Product' : 'Add Product'}
//         </Button>
//       </Form>

//       <h2 className="my-4">Your Products</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length > 0 ? (
//             products.map(product => (
//               <tr key={product.productId}>
//                 <td>{product.productName}</td>
//                 <td>₹{product.productPrice}</td>
//                 <td>{product.category.categoryName}</td>
//                 <td>
//                   <Button 
//                     variant="warning" 
//                     onClick={() => handleEdit(product)}
//                     className="me-2"
//                   >
//                     Update
//                   </Button>
//                   <Button 
//                     variant="danger" 
//                     onClick={() => handleDelete(product.productId)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Seller;



import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import './Sel.css'; // Ensure your custom styles are applied

const Seller = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // To store user's products
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null); // For editing product
  const [imageUrl, setImageUrl] = useState(''); // To store image URL for display

  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  useEffect(() => {
    // Fetch all categories
    fetch('http://localhost:5216/api/Category/Get-All-Categorys')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Expected an array but got:', data.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });

    // Fetch all products and filter by userId
    fetch('http://localhost:5216/api/Product/Get-All-Product')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          const userProducts = data.data.filter(product => product.userId == userId);
          setProducts(userProducts);
        } else {
          console.error('Expected an array but got:', data.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, [userId]);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('ProductName', productName);
    formData.append('ProductDescription', productDescription);
    formData.append('CategoryId', categoryId);
    formData.append('ProductPrice', productPrice);
    formData.append('DiscountPrice', discountPrice);
    formData.append('StockQuantity', stockQuantity);
    formData.append('UserId', userId);

    // Append the image file if present
    if (imageFile) {
      formData.append('ImageFile', imageFile);
    } else if (imageUrl) {
      // Preserve existing image URL during updates if no new image is uploaded
      formData.append('ImageUrl', imageUrl);
    } else {
      // Use a placeholder image if no image is provided
      formData.append('ImageUrl', 'https://via.placeholder.com/150');
    }

    const url = editingProductId
      ? `http://localhost:5216/api/Product/Update_Product_By_Id/${editingProductId}`
      : 'http://localhost:5216/api/Product/Adding-Product';

    const method = editingProductId ? 'PUT' : 'POST';

    // Post the product data using fetch API
    fetch(url, {
      method: method,
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Product added/updated successfully!", data);

        // Clear the form fields
        setProductName('');
        setProductDescription('');
        setCategoryId('');
        setProductPrice(0);
        setDiscountPrice(0);
        setStockQuantity(0);
        setImageFile(null);
        setEditingProductId(null);
        setImageUrl('');

        // Alert the user
        alert('Product added/updated successfully!');

        // Optionally, update the product list after adding a product
        if (data && data.data) {
          if (editingProductId) {
            // Update the product list with the edited product
            setProducts(prevProducts => 
              prevProducts.map(product => 
                product.productId === editingProductId ? data.data : product
              )
            );
          } else {
            // Add the new product to the list
            setProducts(prevProducts => [...prevProducts, data.data]);
          }
        }
      })
      .catch(error => {
        console.error("There was an error adding/updating the product!", error);
      });
  };

  const handleEdit = (product) => {
    // Populate form fields with product data for editing
    setProductName(product.productName);
    setProductDescription(product.productDescription);
    setCategoryId(product.categoryId);
    setProductPrice(product.productPrice);
    setDiscountPrice(product.discountPrice);
    setStockQuantity(product.stockQuantity);
    setEditingProductId(product.productId);
    setImageUrl(product.imageUrl); // Preserve the image URL for updates
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:5216/api/Product/delete_Product_by_Id/${productId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log("Product deleted successfully!", data);
          setProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
        })
        .catch(error => {
          console.error("There was an error deleting the product!", error);
        });
    }
  };

  return (
    <Container>
      <h1 className="my-4">Add New Product</h1>
      <Form onSubmit={handleProductSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="Enter product name" 
                required 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control 
                type="number" 
                value={productPrice} 
                onChange={(e) => setProductPrice(e.target.value)} 
                placeholder="Enter product price" 
                required 
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="discountPrice">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control 
                type="number" 
                value={discountPrice} 
                onChange={(e) => setDiscountPrice(e.target.value)} 
                placeholder="Enter discount price" 
                required 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="stockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control 
                type="number" 
                value={stockQuantity} 
                onChange={(e) => setStockQuantity(e.target.value)} 
                placeholder="Enter stock quantity" 
                required 
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)} 
            placeholder="Enter product description" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="categoryId" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control 
            as="select" 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)} 
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control 
            type="file" 
            onChange={(e) => setImageFile(e.target.files[0])} 
          />
          {imageUrl && (
            <div className="mt-3">
              <img src={imageUrl} alt="Current product" width="150" />
            </div>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingProductId ? 'Update Product' : 'Add Product'}
        </Button>
      </Form>

      <h2 className="my-4">Your Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>{product.categoryName}</td>
              <td>₹{product.productPrice}</td>
              <td>₹{product.discountPrice}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                {' '}
                <Button variant="danger" onClick={() => handleDelete(product.productId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Seller;

