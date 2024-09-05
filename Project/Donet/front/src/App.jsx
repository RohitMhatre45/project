// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import './App.css';
// import Navbars from './components/Navbar/Navbars';
// import Footer from './components/Footer/Footer';
// import Home from './components/pages/Home';
// import AboutUs from './components/pages/AboutUs';
// import ContactUs from './components/pages/ContactUs';
// import Cart from './components/pages/Cart';
// import Login from './components/UserRegister/Login';
// import Signup from './components/UserRegister/Signup';
// import WishList from './components/pages/WishList';
// import Dashboard from './components/Admin/Dashboard';
// import Seller from './components/Seller/Seller';
// import Order from './components/Order/Order';
// //import Address from './components/Address/Address';
// import ShippingAddress from './components/Address/ShippingAddress';
// import Summary from './components/Summary/Summary';
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       <div className="app-container">
//         <Navbars />
       
//         <main className="flex-fill">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<AboutUs/>} />
//             <Route path="/contact" element={<ContactUs />} />

//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup/>} />


//             <Route path="/whishlist" element={<WishList/>} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/admin" element={<Dashboard/>} />
//             <Route path="/seller" element={<Seller/>} />
//             <Route path="/order" element={<Order/>} />
//             <Route path="/add-addresss" element={<ShippingAddress/>} />
//             <Route path="/summary" element={<Summary/>} />
//             {/* Add more routes as needed */}
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
import Navbars from './components/Navbar/Navbars';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import Cart from './components/pages/Cart';
import Login from './components/UserRegister/Login';
import Signup from './components/UserRegister/Signup';
import WishList from './components/pages/WishList';
import Dashboard from './components/Admin/Dashboard';
import Seller from './components/Seller/Seller';
import Order from './components/Order/Order';
import ShippingAddress from './components/Address/ShippingAddress';
import Summary from './components/Summary/Summary';

import PrivateRoute from './components/Auth/PrivateRoute';
import { AdminRoute, SellerRoute } from './components/Auth/RoleRoutes';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbars />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/whishlist"
              element={<PrivateRoute element={WishList} />}
            />
            <Route
              path="/cart"
              element={<PrivateRoute element={Cart} />}
            />
            <Route
              path="/order"
              element={<PrivateRoute element={Order} />}
            />
            <Route
              path="/add-addresss"
              element={<PrivateRoute element={ShippingAddress} />}
            />
            <Route
              path="/summary"
              element={<PrivateRoute element={Summary} />}
            />

            <Route
              path="/admin"
              element={<AdminRoute element={Dashboard} />}
            />
            <Route
              path="/seller"
              element={<SellerRoute element={Seller} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
