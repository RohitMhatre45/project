// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
// import './AppNavbar.css'; // Custom CSS

// function Navbars() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isSeller, setIsSeller] = useState(false); // State for Seller

//   useEffect(() => {
//     // Check if user is in localStorage
//     const user = localStorage.getItem('user');
//     if (user) {
//       setIsAuthenticated(true);
//       const parsedUser = JSON.parse(user);
//       // Check if user role ID is 2 for admin
//       if (parsedUser.userRoleId === 3) {
//         setIsAdmin(true);
//       } else {
//         setIsAdmin(false);
//       }
//       // Check if user role ID is 1004 for seller
//       if (parsedUser.userRoleId === 1) {
//         setIsSeller(true);
//       } else {
//         setIsSeller(false);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//       setIsSeller(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Clear localStorage and update authentication state
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     setIsSeller(false);
//     window.location.href = '/'; // Redirect to home page after logout
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
//       <Container>
//         <Navbar.Brand href="/" className="brand-text">Bookshelf</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/" className="nav-link-text">Home</Nav.Link>
//             <Nav.Link href="/about" className="nav-link-text">About Us</Nav.Link>
//             <Nav.Link href="/contact" className="nav-link-text">Contact Us</Nav.Link>
//             {isAdmin && (
//               <Nav.Link href="/admin" className="nav-link-text">Admin Dashboard</Nav.Link>
//             )}
//             {isSeller && (
//               <Nav.Link href="/seller" className="nav-link-text">Seller Dashboard</Nav.Link>
//             )}
//           </Nav>
//           <Nav className="ms-3">
//             {!isSeller && (
//               <>
//                 <Nav.Link href="/whishlist" className="nav-link-text">
//                   <FontAwesomeIcon icon={faHeart} />
//                 </Nav.Link>
//                 <Nav.Link href="/cart" className="nav-link-text">
//                   <FontAwesomeIcon icon={faCartShopping} />
//                 </Nav.Link>
//               </>
//             )}
//             {isAuthenticated ? (
//               <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
//             ) : (
//               <>
//                 <Nav.Link href="/login" className="nav-link-text">Login</Nav.Link>
//                 <Nav.Link href="/signup" className="nav-link-text">SignUp</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navbars;


// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
// import './AppNavbar.css'; // Custom CSS

// function Navbars() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isSeller, setIsSeller] = useState(false); // State for Seller

//   useEffect(() => {
//     // Check if user is in localStorage
//     const user = localStorage.getItem('user');
//     const token = localStorage.getItem('token'); // Check if token exists

//     if (user && token) {
//       setIsAuthenticated(true);
//       const parsedUser = JSON.parse(user);
//       // Check if user role ID is 3 for admin
//       if (parsedUser.userRoleId === 3) {
//         setIsAdmin(true);
//       } else {
//         setIsAdmin(false);
//       }
//       // Check if user role ID is 1004 for seller
//       if (parsedUser.userRoleId === 1) {
//         setIsSeller(true);
//       } else {
//         setIsSeller(false);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setIsAdmin(false);
//       setIsSeller(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Clear localStorage and update authentication state
//     localStorage.removeItem('user');
//     localStorage.removeItem('token'); // Remove token as well
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     setIsSeller(false);
//     window.location.href = '/'; // Redirect to home page after logout
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
//       <Container>
//         <Navbar.Brand href="/" className="brand-text">Bookshelf</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/" className="nav-link-text">Home</Nav.Link>
//             <Nav.Link href="/about" className="nav-link-text">About Us</Nav.Link>
//             <Nav.Link href="/contact" className="nav-link-text">Contact Us</Nav.Link>
//             {isAdmin && (
//               <Nav.Link href="/admin" className="nav-link-text">Admin Dashboard</Nav.Link>
//             )}
//             {isSeller && (
//               <Nav.Link href="/seller" className="nav-link-text">Seller Dashboard</Nav.Link>
//             )}
//           </Nav>
//           <Nav className="ms-3">
//             {!isSeller && (
//               <>
//                 <Nav.Link href="/whishlist" className="nav-link-text">
//                   <FontAwesomeIcon icon={faHeart} />
//                 </Nav.Link>
//                 <Nav.Link href="/cart" className="nav-link-text">
//                   <FontAwesomeIcon icon={faCartShopping} />
//                 </Nav.Link>
//               </>
//             )}
//             {isAuthenticated ? (
//               <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
//             ) : (
//               <>
//                 <Nav.Link href="/login" className="nav-link-text">Login</Nav.Link>
//                 <Nav.Link href="/signup" className="nav-link-text">SignUp</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navbars;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode'
import './AppNavbar.css';

function Navbars() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      const decodedToken = jwtDecode(token);
     console.log(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
      const roleid = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(user);
      console.log(parsedUser)
      if (roleid === "Admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      if (roleid === "Seller") {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsSeller(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSeller(false);
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="brand-text">Bookshelf</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="nav-link-text">Home</Nav.Link>
            <Nav.Link href="/about" className="nav-link-text">About Us</Nav.Link>
            <Nav.Link href="/contact" className="nav-link-text">Contact Us</Nav.Link>
            {isAdmin && (
              <Nav.Link href="/admin" className="nav-link-text">Admin Dashboard</Nav.Link>
            )}
            {isSeller && (
              <Nav.Link href="/seller" className="nav-link-text">Seller Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav className="ms-3">
            {!isSeller && !isAdmin &&(
              <>
                <Nav.Link href="/whishlist" className="nav-link-text">
                  <FontAwesomeIcon icon={faHeart} />
                </Nav.Link>
                <Nav.Link href="/cart" className="nav-link-text">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Nav.Link>
              </>
            )}
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Nav.Link href="/login" className="nav-link-text">Login</Nav.Link>
                <Nav.Link href="/signup" className="nav-link-text">SignUp</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;

